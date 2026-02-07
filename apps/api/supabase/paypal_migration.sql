
-- Run this in Supabase SQL Editor to add PayPal support

-- PLANS Table
create table if not exists plans (
  id serial primary key,
  key text unique not null,
  name text not null,
  paypal_plan_id text,
  price_monthly integer,
  features jsonb
);

-- SUBSCRIPTIONS Table
create table if not exists subscriptions (
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
create table if not exists billing_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  subscription_id uuid references subscriptions(id),
  amount integer not null,
  currency text default 'USD',
  status text not null,
  paypal_transaction_id text,
  created_at timestamptz default now()
);

-- RLS Policies
alter table subscriptions enable row level security;
alter table billing_history enable row level security;

create policy "Users can view own subscription" on subscriptions for select using (auth.uid() = user_id);
create policy "Users can view own billing history" on billing_history for select using (auth.uid() = user_id);

-- Insert Default Data
insert into plans (key, name, price_monthly, features) values
('starter', 'Starter', 0, '["5 Projects", "Basic Analytics", "Community Support"]'),
('pro', 'Pro Creator', 900, '["Unlimited Projects", "Advanced Analytics", "Priority Email Support"]'),
('business', 'Business Plus', 2900, '["Team Accounts", "API Access", "Dedicated Support"]');
