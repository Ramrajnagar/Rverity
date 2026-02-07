
-- Create Tools table if it doesn't exist (Stores API Keys)
create table if not exists tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  api_key_hash text not null,
  last_active timestamptz,
  created_at timestamptz default now()
);

-- Enable RLS
alter table tools enable row level security;

-- Policies (Drop first to avoid conflicts if re-running)
drop policy if exists "Users can view own tools" on tools;
drop policy if exists "Users can insert own tools" on tools;
drop policy if exists "Users can delete own tools" on tools;

create policy "Users can view own tools" on tools for select using (auth.uid() = user_id);
create policy "Users can insert own tools" on tools for insert with check (auth.uid() = user_id);
create policy "Users can delete own tools" on tools for delete using (auth.uid() = user_id);
