create table if not exists tools (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  name text not null,
  api_key_hash text not null unique,
  last_active timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_tools_user_id on tools(user_id);
create unique index if not exists idx_tools_api_key_hash on tools(api_key_hash);

create table if not exists plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  paypal_plan_id text unique,
  price_cents integer not null default 0,
  max_memories integer not null default 1000,
  max_api_keys integer not null default 3,
  features jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null,
  plan_id uuid references plans(id),
  paypal_subscription_id text unique,
  status text not null default 'inactive',
  current_period_start timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_subscriptions_user_id on subscriptions(user_id);
create unique index if not exists idx_subscriptions_paypal_id on subscriptions(paypal_subscription_id);

insert into plans (name, paypal_plan_id, price_cents, max_memories, max_api_keys, features) values
  ('Free', null, 0, 1000, 3, '{"analytics": false, "priority_support": false}'),
  ('Team', null, 1200, 50000, 20, '{"analytics": true, "priority_support": true}')
on conflict do nothing;
