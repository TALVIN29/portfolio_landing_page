import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, accept',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse multipart/form-data from index.html
    const formData = await req.formData();
    const name = formData.get('name') || 'Unknown';
    const email = formData.get('email') || '';
    const problem = formData.get('problem') || 'None provided';
    const hours_lost = formData.get('hours_lost') || '0';
    const slaTimestamp = formData.get('slaTimestamp') || new Date().toISOString();

    // Initialize Supabase admin client to bypass Row Level Security since this is a public form
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 1. Insert into Database (Diagnostic Engine pipeline)
    const { data: lead, error: dbError } = await supabase
      .from('leads')
      .insert([
        { 
          name: name.toString(), 
          email: email.toString(), 
          problem_description: problem.toString(), 
          hours_lost_weekly: parseInt(hours_lost.toString(), 10), 
          sla_timestamp: slaTimestamp.toString(),
          sla_status: 'PENDING'
        }
      ])
      .select()
      .single();

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    // 2. Alert operations via Slack Webhook
    const slackWebhookUrl = Deno.env.get('SLACK_WEBHOOK_URL');
    if (slackWebhookUrl) {
      // Calculate strict 48-hour deadline
      const deadline = new Date(new Date(slaTimestamp.toString()).getTime() + (48 * 60 * 60 * 1000));
      
      const slackPayload = {
        text: `🚨 *New AXELO Diagnostic Request* 🚨\n\n*Name:* ${name}\n*Email:* ${email}\n*Hours Lost:* ${hours_lost} hrs/wk\n*Problem:* ${problem}\n\n*48hr SLA Deadline:* ${deadline.toUTCString()}`
      };

      await fetch(slackWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackPayload)
      });
    }

    // 3. Return generic JSON success (matching frontend Fetch Expectation)
    return new Response(JSON.stringify({ success: true, lead_id: lead.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
