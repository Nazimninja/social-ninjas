-- =========================================================
-- Social Ninja's CRM Database Schema
-- Run this in your NEW Supabase project ? SQL Editor
-- =========================================================

-- ====================
-- 1. LEADS TABLE
-- ====================
CREATE TABLE IF NOT EXISTS leads (
  id            TEXT PRIMARY KEY DEFAULT concat('lead_', extract(epoch from now())::bigint::text),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  company       TEXT,
  website       TEXT,
  message       TEXT,
  source        TEXT DEFAULT 'main-contact-page',
  status        TEXT DEFAULT 'new',
  next_follow_up   TIMESTAMP WITH TIME ZONE,
  follow_up_notes  TEXT,
  notes         TEXT,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);

-- ====================
-- 2. CONTENT STUDIO CLIENTS TABLE
-- ====================
CREATE TABLE IF NOT EXISTS content_studio_clients (
  id                TEXT PRIMARY KEY,
  brand_name        TEXT,
  niche             TEXT,
  email             TEXT UNIQUE NOT NULL,
  phone             TEXT,
  tone_of_voice     TEXT,
  target_audience   TEXT,
  call_to_action    TEXT,
  plan              TEXT DEFAULT 'trial',
  plan_name         TEXT,
  payment_status    TEXT DEFAULT 'pending',
  active            BOOLEAN DEFAULT TRUE,
  payment_id        TEXT,
  subscription_id   TEXT,
  join_date         TEXT,
  source            TEXT DEFAULT 'content-studio',
  next_follow_up    TIMESTAMP WITH TIME ZONE,
  notes             TEXT,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_content_studio_clients_updated_at ON content_studio_clients;
CREATE TRIGGER update_content_studio_clients_updated_at
  BEFORE UPDATE ON content_studio_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================================
-- 3. ROW LEVEL SECURITY (RLS) FIX (Fixes Security Advisor Errors)
-- =========================================================

-- Enable RLS on both public tables
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_studio_clients ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies
DROP POLICY IF EXISTS "Allow public lead creation" ON public.leads;
DROP POLICY IF EXISTS "Allow public client registration" ON public.content_studio_clients;
DROP POLICY IF EXISTS "Allow public client update" ON public.content_studio_clients;

-- LEADS TABLE POLICIES:
-- Allow website visitors (anon/public) to submit contact forms / new leads
CREATE POLICY "Allow public lead creation"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- CONTENT STUDIO CLIENTS TABLE POLICIES:
-- Allow new client signups / onboarding form submissions
CREATE POLICY "Allow public client registration"
  ON public.content_studio_clients
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow updating client details during onboarding
CREATE POLICY "Allow public client update"
  ON public.content_studio_clients
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

