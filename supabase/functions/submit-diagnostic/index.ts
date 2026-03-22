import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const allowedOrigin = Deno.env.get('ALLOWED_ORIGIN') || 'https://your-portfolio.netlify.app';

const getCorsHeaders = (origin: string | null) => {
  // If allowedOrigin is set to a specific domain, use it; otherwise echo the request origin for localhost/netlify
  const safeOrigin = origin && (origin === allowedOrigin || origin.endsWith('netlify.app') || origin.startsWith('http://localhost')) 
    ? origin 
    : allowedOrigin;
    
  return {
    'Access-Control-Allow-Origin': safeOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept',
  };
};

// --- RATE LIMITING CONSTANTS ---
const RATE_LIMIT_MAX = 3;        // Max submissions per IP
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

serve(async (req: Request) => {
  const origin = req.headers.get('Origin');
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // Reject unauthorized origins
  const safeOrigin = corsHeaders['Access-Control-Allow-Origin'];
  if (origin && safeOrigin !== origin && safeOrigin !== '*') {
    return new Response(JSON.stringify({ error: 'CORS Origin Denied' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 403,
    });
  }

  try {
    // --- RATE LIMITING (IP-based via Supabase KV table) ---
    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    // Initialize Supabase admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

    // Count submissions from this IP in the last 24 hours
    const { count, error: countError } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('source_ip', clientIp)
      .gte('created_at', windowStart);

    if (countError) {
      console.error('Rate limit check failed:', countError.message);
      // Fail-open: don't block legitimate submissions on a DB error
    } else if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Maximum 3 submissions per 24 hours per IP.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        }
      );
    }

    // --- PARSE FORM DATA ---
    const formData = await req.formData();

    // Honeypot check (server-side enforcement)
    const honey = formData.get('_honey');
    if (honey && honey.toString().trim() !== '') {
      // Silent reject for bots — return 200 to avoid enumeration
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const name = formData.get('name') || 'Unknown';
    const email = formData.get('email') || '';
    const problem = formData.get('problem') || 'None provided';
    const hours_lost = formData.get('hours_lost') || '0';

    // SLA timestamp is always generated server-side (prevents client-side spoofing)
    const slaTimestamp = new Date().toISOString();

    // UTM attribution data
    const utm_source = formData.get('utm_source')?.toString() || null;
    const utm_medium = formData.get('utm_medium')?.toString() || null;
    const utm_campaign = formData.get('utm_campaign')?.toString() || null;

    // 1. Insert into Database
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: name.toString(),
          email: email.toString(),
          problem_description: problem.toString(),
          hours_lost_weekly: parseInt(hours_lost.toString(), 10),
          sla_timestamp: slaTimestamp,
          sla_status: 'PENDING',
          source_ip: clientIp,
          utm_source,
          utm_medium,
          utm_campaign,
        }
      ])
      .select()
      .single();

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    // 2. Alert operations via Slack Webhook
    const slackWebhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (slackWebhookUrl) {
      const deadline = new Date(new Date(slaTimestamp).getTime() + (48 * 60 * 60 * 1000));
      
      // Format to Malaysia Time (MYT / UTC+8)
      const formattedDeadline = deadline.toLocaleString('en-US', {
        timeZone: 'Asia/Kuala_Lumpur',
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      const utmInfo = utm_source ? `\n*Source:* ${utm_source} / ${utm_medium} / ${utm_campaign}` : '';

      const slackPayload = {
        text: `🚨 *New AXELO Diagnostic Request* 🚨\n\n*Name:* ${name}\n*Email:* ${email}\n*Hours Lost:* ${hours_lost} hrs/wk\n*Problem:* ${problem}${utmInfo}\n\n*48hr SLA Deadline:* ${formattedDeadline}`
      };

      await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackPayload)
      });
    }

    // 3. Return generic JSON success
    return new Response(JSON.stringify({ success: true, lead_id: lead.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
