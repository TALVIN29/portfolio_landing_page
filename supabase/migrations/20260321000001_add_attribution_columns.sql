-- =================================================================================
-- AXELO DIAGNOSTIC ENGINE - MIGRATION 0002 (REVISED)
-- Safe incremental ALTER — adds ALL missing columns with IF NOT EXISTS guards.
-- Run in Supabase Dashboard → SQL Editor
-- =================================================================================

-- Add created_at (standard audit column — missed in original manual table creation)
ALTER TABLE public.leads
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add source_ip column for IP-based rate limiting (max 3 submissions / 24 hrs)
ALTER TABLE public.leads
    ADD COLUMN IF NOT EXISTS source_ip TEXT;

-- Add UTM attribution columns for flywheel channel tracking
ALTER TABLE public.leads
    ADD COLUMN IF NOT EXISTS utm_source TEXT;

ALTER TABLE public.leads
    ADD COLUMN IF NOT EXISTS utm_medium TEXT;

ALTER TABLE public.leads
    ADD COLUMN IF NOT EXISTS utm_campaign TEXT;

-- Performance index: rate limit check queries source_ip + created_at on every submission
CREATE INDEX IF NOT EXISTS idx_leads_source_ip_created_at
    ON public.leads (source_ip, created_at);

-- End of Migration 0002
