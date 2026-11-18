-- wkE Supabase schema
-- 在 Supabase Dashboard → SQL Editor 執行本檔

-- M1：對應 Firestore users/1167
create table if not exists public.demo_users (
  id text primary key,
  name text,
  age integer,
  tel jsonb
);

-- Blog 線（M5–M6、Ma–Mc）
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  title text,
  author text,
  date text,
  content text,
  image text,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_created_at_desc_idx
  on public.blogs (created_at desc);

-- Chat 線（M2、M9）：扁平表取代 Firestore 子集合
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room_id text not null default 'chatroom1',
  sender_name text,
  message text,
  time_stamp bigint not null,
  user_id uuid references auth.users (id) on delete set null
);

create index if not exists chat_messages_room_time_idx
  on public.chat_messages (room_id, time_stamp);

-- 啟用 Realtime（若已加入會報錯，可忽略；也可在 Dashboard → Database → Publications 勾選）
do $$
begin
  alter publication supabase_realtime add table public.blogs;
exception
  when duplicate_object then null;
  when others then
    raise notice 'blogs realtime: %', SQLERRM;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.chat_messages;
exception
  when duplicate_object then null;
  when others then
    raise notice 'chat_messages realtime: %', SQLERRM;
end $$;
