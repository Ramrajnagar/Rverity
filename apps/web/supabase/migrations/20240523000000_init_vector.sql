-- Enable the pgvector extension to work with embedding vectors
create extension if not exists vector;

-- Create a table to store your documents
create table if not exists memories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null, -- references auth.users(id) on delete cascade
  content text not null,
  source text not null default 'api',
  tags text[] default array[]::text[],
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536), -- OpenAI embeddings are 1536 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a function to search for memories
create or replace function match_memories (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  p_user_id uuid
)
returns table (
  id uuid,
  content text,
  source text,
  tags text[],
  metadata jsonb,
  created_at timestamp with time zone,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    memories.id,
    memories.content,
    memories.source,
    memories.tags,
    memories.metadata,
    memories.created_at,
    1 - (memories.embedding <=> query_embedding) as similarity
  from memories
  where 1 - (memories.embedding <=> query_embedding) > match_threshold
  and memories.user_id = p_user_id
  order by memories.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- Create an index for faster queries
create index on memories using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
