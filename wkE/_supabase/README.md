# wkE Supabase 專案建置

對應 Firebase 週（`wkD`），本週範例改用 **Supabase**（Postgres + Auth + Realtime）。

## 1. 建立專案

1. 到 [Supabase](https://supabase.com/) 註冊並建立一個 Project
2. 進入 **Project Settings → API**，複製：
   - **Project URL**
   - **anon public** key（不要使用 `service_role`）

## 2. 執行 SQL

在 Dashboard → **SQL Editor**：

1. 貼上並執行 [`schema.sql`](./schema.sql)
2. 再執行 [`rls.sql`](./rls.sql)

若 `alter publication ... add table` 出現「already member」錯誤，可忽略（表已加入 Realtime）。

也可到 **Database → Publications → supabase_realtime** 手動勾選 `blogs`、`chat_messages`。

## 3. 啟用 Email Auth

1. **Authentication → Providers → Email** 保持啟用
2. 課堂開發可暫時關閉 **Confirm email**（避免學生收不到驗證信）

## 4. 填入前端設定（全週共用一份）

所有模組共用本目錄的 **`supabaseConfig.js`**（含 M1／M2）：

1. 複製樣板：
   ```bash
   cp wkE/_supabase/supabaseConfig.template.js wkE/_supabase/supabaseConfig.js
   ```
2. 編輯 `supabaseConfig.js`，把 `YOUR_SUPABASE_URL`／`YOUR_SUPABASE_ANON_KEY` 換成自己的專案值
3. 各頁面以相對路徑引用：
   ```html
   <script src="../_supabase/supabaseConfig.js" defer></script>
   ```

`supabaseConfig.js` 已列入 repo 根目錄 `.gitignore`，**不會也不應推送到 GitHub**。推送的是不含金鑰的 `supabaseConfig.template.js`。

之後若要換專案，只需改這一個檔。

## 5. 本機開啟方式

這些範例是純靜態頁。請讓伺服器根目錄涵蓋整個 `wkE`（才能讀到 `_supabase/`）：

- **VS Code Live Server**：以課程 workspace 開啟即可
- 或：
  ```bash
  npx serve wkE
  # 再開 http://localhost:3000/M5_uploadPage/ 等路徑
  ```

不要使用 `npx serve wkE/M5_uploadPage` 這類「只開單一模組」的方式。

## 6. M9 強化聊天寫入權限

預設 `rls.sql` 允許匿名寫入聊天（方便 M2）。上到 M9 時，取消註解 `rls.sql` 底部的「M9 加強版」並執行，改為僅登入使用者可 `insert`。
