/**
 * Supabase 共用設定樣板（全 wkE 模組共用）
 *
 * 使用方式：
 * 1. 複製本檔為同目錄的 supabaseConfig.js
 * 2. 把下方 YOUR_* 換成自己的 Project URL 與 anon key
 * 3. supabaseConfig.js 已列入 .gitignore，請勿推送到 GitHub
 *
 * （見 _supabase/README.md）
 */

const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

// CDN 全域物件是 window.supabase（函式庫）；客戶端另存為 supabaseClient，避免名稱衝突
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
