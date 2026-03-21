-- =================================================================================
-- AXELO DIAGNOSTIC ENGINE - INITIAL SCHEMA MIGRATION
-- Compliant with AXELO_ARCHITECT.md Phase 5 Delivery Protocols
-- 
-- Usage: Execute this in the Supabase SQL Editor, or run via Supabase CLI
-- =================================================================================

-- 1. Create the Leads Table to track SLA and payload requests
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,         -- Unique Identifier
    name TEXT NOT NULL,                                    -- Client Name
    email TEXT NOT NULL,                                   -- Client Contact
    problem_description TEXT,                              -- Form Payload (Text Area)
    hours_lost_weekly INTEGER,                             -- Form Payload (Capacity Cost)
    sla_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),  -- Auto-generated SLA Timestamp mapping to 48hr turnaround
    sla_status TEXT DEFAULT 'PENDING',                     -- Tracking string (PENDING, ACTIVE, DELIVERED)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()      -- DB Insert Standard Logging
);

-- 2. Enable Row Level Security (RLS)
-- Crucial for secure Supabase architectures. 
-- Public reading/writing is blocked. Only our Edge Function can write to this using its backend Service Role Key.
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- End of Migration
