# wkE：Supabase 應用範例

對應 [`wkD`](../wkD)（Firebase）的一對一教學範例，改以 **Supabase**（Postgres + Auth + Realtime）實作。

## 開始之前

1. 依 [`_supabase/README.md`](./_supabase/README.md) 建立專案並執行 `schema.sql`、`rls.sql`
2. **設定共用連線（只做一次）**
   - 複製 [`_supabase/supabaseConfig.template.js`](./_supabase/supabaseConfig.template.js)  
     → 同目錄改名為 `_supabase/supabaseConfig.js`
   - 填入自己的 **Project URL** 與 **anon key**
   - 全週模組（含 M1／M2）都透過 `<script src="../_supabase/supabaseConfig.js">` 引用這一份
   - `supabaseConfig.js` 已列入 `.gitignore`，**請勿推送到 GitHub**

## 學習順序

| 模組 | 主題 | 對應 wkD |
|------|------|----------|
| `M1_HelloSupabase` | Postgres 單列讀寫（upsert／select） | `M1_HelloFirebase` |
| `M2_chatRoom` | 公開聊天 + Realtime | `M2_chatRoom` |
| `M3_blogPage` | 靜態部落格列表 | `M3_blogPage` |
| `M4_contentPage` | 靜態文章詳情 | `M4_contentPage` |
| `M5_uploadPage` | `blogs` 查詢與種子上傳 | `M5_uploadPage` |
| `M6_cmspage` | CMS：Realtime 列表、刪除 | `M6_cmspage` |
| `M7_auth` | Email／Password 登入註冊 | `M7_auth` |
| `M8_signUpWithProfile` | `user_metadata` 個人檔 | `M8_signUpWithProfile` |
| `M9_securedChatRoom` | 登入後聊天（可搭配 RLS） | `M9_securedChatRoom` |
| `Ma_PWASupaBlog` | SupaBlog + Web Manifest | `Ma_PWAFireBlog` |
| `Mb_PWASupaBlogSW` | + Service Worker／安裝提示 | `Mb_PWAFireBlogSW` |
| `Mc_PWASupaBlogOffline` | + Offline App Shell | `Mc_PWAFireBlogOffline` |

## Firebase → Supabase 速查

| 情境 | Firebase | Supabase |
|------|----------|----------|
| 讀一筆 | `doc.get()` | `.from('…').select().eq().maybeSingle()` |
| 寫入 | `set`／`add` | `.upsert()`／`.insert()` |
| 列表排序 | `orderBy().get()` | `.select().order()` |
| 即時 | `onSnapshot` | `channel().on('postgres_changes', …)` + 初次 `select` |
| 刪除 | `doc.delete()` | `.delete().eq('id', id)` |
| 登入／註冊 | Auth email API | `signInWithPassword`／`signUp` |
| 個人檔 | `updateProfile` | `updateUser({ data })`／`user_metadata` |

## 技術形態

- 純靜態 HTML／CSS／Vanilla JS
- CDN：`@supabase/supabase-js@2`
- Blog 線：Tailwind v4 browser CDN；Auth／Chat 線：Bootstrap（與 wkD 相同）
- 本機建議用 VS Code Live Server（以 workspace／`wkE` 為根），或 `npx serve wkE` 後再開各模組路徑；勿只 serve 單一模組子資料夾，否則讀不到 `../_supabase/supabaseConfig.js`
