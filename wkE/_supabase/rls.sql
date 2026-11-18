-- wkE Supabase RLS（課堂寬鬆版）
-- 先執行 schema.sql，再執行本檔

-- ---------------------------------------------------------------------------
-- demo_users（M1）：anon 可讀寫
-- ---------------------------------------------------------------------------
alter table public.demo_users enable row level security;

drop policy if exists "demo_users_select_anon" on public.demo_users;
drop policy if exists "demo_users_insert_anon" on public.demo_users;
drop policy if exists "demo_users_update_anon" on public.demo_users;
drop policy if exists "demo_users_delete_anon" on public.demo_users;

create policy "demo_users_select_anon"
  on public.demo_users for select
  to anon, authenticated
  using (true);

create policy "demo_users_insert_anon"
  on public.demo_users for insert
  to anon, authenticated
  with check (true);

create policy "demo_users_update_anon"
  on public.demo_users for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "demo_users_delete_anon"
  on public.demo_users for delete
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- blogs（M5–Mc）：anon 可 select / insert / delete（對應課堂開放 CMS）
-- ---------------------------------------------------------------------------
alter table public.blogs enable row level security;

drop policy if exists "blogs_select_anon" on public.blogs;
drop policy if exists "blogs_insert_anon" on public.blogs;
drop policy if exists "blogs_update_anon" on public.blogs;
drop policy if exists "blogs_delete_anon" on public.blogs;

create policy "blogs_select_anon"
  on public.blogs for select
  to anon, authenticated
  using (true);

create policy "blogs_insert_anon"
  on public.blogs for insert
  to anon, authenticated
  with check (true);

create policy "blogs_update_anon"
  on public.blogs for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "blogs_delete_anon"
  on public.blogs for delete
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- chat_messages（M2 開放版）：anon 可讀寫
-- 上完 M9 後，可改用下方「M9 加強版」：僅登入者可 insert
-- ---------------------------------------------------------------------------
alter table public.chat_messages enable row level security;

drop policy if exists "chat_messages_select" on public.chat_messages;
drop policy if exists "chat_messages_insert_anon" on public.chat_messages;
drop policy if exists "chat_messages_insert_auth_only" on public.chat_messages;

create policy "chat_messages_select"
  on public.chat_messages for select
  to anon, authenticated
  using (true);

-- M2 課堂預設：允許匿名寫入
create policy "chat_messages_insert_anon"
  on public.chat_messages for insert
  to anon, authenticated
  with check (true);

/*
-- ===== M9 加強版（課堂切換用）=====
-- 1) 刪除匿名寫入政策
drop policy if exists "chat_messages_insert_anon" on public.chat_messages;

-- 2) 僅 authenticated 可 insert
create policy "chat_messages_insert_auth_only"
  on public.chat_messages for insert
  to authenticated
  with check (auth.uid() is not null);
*/
