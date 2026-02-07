-- Run this in your Supabase SQL Editor

create table if not exists companions (
  id uuid primary key default gen_random_uuid(),
  author text not null,
  name text not null,
  subject text not null,
  topic text not null,
  voice text not null,
  style text not null,
  duration integer not null,
  created_at timestamptz default now()
);

create table if not exists session_history (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  companion_id uuid references companions(id) on delete cascade not null,
  created_at timestamptz default now()
);

create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  companion_id uuid references companions(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, companion_id)
);

-- Optional: Enable full text search if needed (not strictly required for basic functionality unless used in queries)
-- The app uses ILIKE so simple text columns are enough.
