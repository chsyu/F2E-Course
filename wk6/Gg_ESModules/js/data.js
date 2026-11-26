/**
 * 資料模組（js/data.js）
 * 透過 export 明確公開需要的資料與純函式，未匯出的內部變數不會污染全域 window。
 */

// 故意與 render.js 宣告同名內部常數，示範 ES Modules 的檔案級作用域隔離（不會互相覆蓋）
const MODULE_TAG = 'data-module';

export const ALL_CATEGORY = '全部';

export const ARTICLES = [
  {
    id: 'esm-01',
    title: '原生 ES Modules 模組化拆分',
    category: 'JavaScript',
    author: '前端工程課程',
    date: '2026-11-26',
    summary: '使用 export / import 將資料、畫面與事件邏輯分離，不再依賴 <script> 標籤的載入順序。',
  },
  {
    id: 'esm-02',
    title: '本地工具模組拆分（vendor/format.js）',
    category: '架構設計',
    author: '前端工程課程',
    date: '2026-11-26',
    summary: '不需打包工具，將共用格式化函式獨立成模組，供 main.js 與 render.js 直接匯入重用。',
  },
  {
    id: 'esm-03',
    title: '模組作用域與避免變數撞名',
    category: 'JavaScript',
    author: '前端工程課程',
    date: '2026-11-26',
    summary: 'data.js 與 render.js 各自宣告同名 const MODULE_TAG 也不會衝突，且不會外洩到 window。',
  },
  {
    id: 'esm-04',
    title: 'CSS Grid 無斷點響應式卡片',
    category: 'CSS',
    author: '前端工程課程',
    date: '2026-11-26',
    summary: '運用 repeat(auto-fit, minmax(260px, 1fr)) 搭配邏輯屬性，一行完成跨螢幕排版。',
  },
  {
    id: 'esm-05',
    title: '銜接 wk13 Firebase Modular SDK',
    category: '架構設計',
    author: '前端工程課程',
    date: '2026-11-26',
    summary: '學會原生 import / export 後，到了 wkD 即可用同樣方式匯入 Firebase 官方 Modular SDK。',
  },
];

export const getDataModuleTag = () => MODULE_TAG;

export const getCategories = (articles = ARTICLES) => [
  ALL_CATEGORY,
  ...new Set(articles.map((article) => article.category)),
];

export const filterArticlesByCategory = (category, articles = ARTICLES) => {
  if (!category || category === ALL_CATEGORY) {
    return articles;
  }
  return articles.filter((article) => article.category === category);
};
