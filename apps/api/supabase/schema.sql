
-- Enable pgvector extension
create extension if not exists vector;

-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Registered Tools (VSCode, Cursor, etc.)
create table tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  api_key_hash text not null,
  last_active timestamptz,
  created_at timestamptz default now()
);

-- Memories Table with Vector Support
create table memories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  source text not null, -- 'vscode', 'cursor', 'browser'
  tags text[],
  importance float default 0.5,
  embedding vector(1536), -- OpenAI Ada-2 dimension
  created_at timestamptz default now()
);

-- Create index for vector similarity search
create index on memories using ivfflat (embedding vector_cosine_ops)
with (lists = 100);

-- Enable RLS
alter table profiles enable row level security;
alter table tools enable row level security;
alter table memories enable row level security;

-- Policies (Simple for now: users can only see their own data)
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Users can view own tools" on tools for select using (auth.uid() = user_id);
create policy "Users can insert own tools" on tools for insert with check (auth.uid() = user_id);

create policy "Users can view own memories" on memories for select using (auth.uid() = user_id);
create policy "Users can insert own memories" on memories for insert with check (auth.uid() = user_id);

-- PLANS Table
create table plans (
  id serial primary key,
  key text unique not null,
  name text not null,
  paypal_plan_id text,
  price_monthly integer,
  features jsonb
);

-- SUBSCRIPTIONS Table
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  paypal_subscription_id text unique not null,
  status text not null,
  plan_id integer references plans(id),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- BILLING_HISTORY Table
create table billing_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  subscription_id uuid references subscriptions(id),
  amount integer not null,
  currency text default 'USD',
  status text not null,
  paypal_transaction_id text,
  created_at timestamptz default now()
);

-- RLS Policies for New Tables
alter table subscriptions enable row level security;
alter table billing_history enable row level security;

create policy "Users can view own subscription" on subscriptions for select using (auth.uid() = user_id);
create policy "Users can view own billing history" on billing_history for select using (auth.uid() = user_id);
