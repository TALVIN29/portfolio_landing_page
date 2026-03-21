-- =================================================================================
-- AXELO DIAGNOSTIC ENGINE - INITIAL SCHEMA MIGRATION
-- Compliant with AXELO_ARCHITECT.md Zero-Maintenance protocols
-- =================================================================================

-- 1. Create the Leads Table to track SLA, attribution, and payload requests
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,         -- Unique Identifier
    name TEXT NOT NULL,                                    -- Client Name
    email TEXT NOT NULL,                                   -- Client Contact
    problem_description TEXT,                              -- Form Payload (Text Area)
    hours_lost_weekly INTEGER,                             -- Form Payload (Capacity Cost)
    sla_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- Server-generated SLA Timestamp (48hr turnaround)
    sla_status TEXT DEFAULT 'PENDING',                     -- Tracking string (PENDING, ACTIVE, DELIVERED)
    source_ip TEXT,                                        -- Client IP for rate limiting (max 3/24hr per IP)
    utm_source TEXT,                                       -- UTM Attribution: source channel (linkedin, reddit, devto)
    utm_medium TEXT,                                       -- UTM Attribution: medium (post, comment, article)
    utm_campaign TEXT,                                     -- UTM Attribution: campaign name
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()      -- DB Insert Standard Logging
);

-- Performance index: rate limiting queries source_ip + created_at on every submission
CREATE INDEX IF NOT EXISTS idx_leads_source_ip_created_at ON public.leads (source_ip, created_at);

-- 2. Enable Row Level Security (RLS)
-- Crucial for secure Supabase architectures. 
-- Public reading/writing is blocked. Only our Edge Function can write to this using its backend Service Role Key.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- End of Migration
