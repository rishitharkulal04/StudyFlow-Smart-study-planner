-- Run this in Supabase Dashboard → SQL Editor → New Query
-- This will reset and recreate the subjects table cleanly

drop table if exists public.subjects;

create table public.subjects (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  exam_date  date        not null,
  difficulty text        not null check (difficulty in ('Easy', 'Medium', 'Hard', 'Very Hard')),
  hours      int8        not null default 0,
  created_at timestamptz not null default now()
);

-- Disable RLS for development (re-enable with auth policies for production)
alter table public.subjects disable row level security;

-- Verify it works
select * from public.subjects limit 1;
