-- ─── StudNexus · early_access_waitlist ──────────────────────────────────
-- Postgres / Supabase schema for the waitlist collection.
-- The frontend currently persists to localStorage; point
-- VITE_WAITLIST_ENDPOINT at an API that writes to this table to go live.

create table if not exists early_access_waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  role        text,                       -- 'Learner' | 'Educator' | 'Both'
  created_at  timestamptz not null default now(),
  source      text default 'direct',
  device      text
);

-- One signup per email (case-insensitive).
create unique index if not exists early_access_waitlist_email_uidx
  on early_access_waitlist (lower(email));

-- Fast date filtering for the admin panel.
create index if not exists early_access_waitlist_created_idx
  on early_access_waitlist (created_at desc);

-- ── Supabase Row Level Security (recommended) ───────────────────────────
-- Allow anonymous INSERT (public signup) but no public SELECT.
alter table early_access_waitlist enable row level security;

create policy "Public can join waitlist"
  on early_access_waitlist for insert
  to anon
  with check (true);

-- Reads are restricted to the service role / authenticated admins only.
-- (No SELECT policy for anon == no public read access.)
