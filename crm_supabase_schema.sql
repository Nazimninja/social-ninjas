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
  notes         TEXT,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX leads_created_at_idx ON leads(created_at DESC);

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

CREATE TRIGGER update_content_studio_clients_updated_at
  BEFORE UPDATE ON content_studio_clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE content_studio_clients DISABLE ROW LEVEL SECURITY;
