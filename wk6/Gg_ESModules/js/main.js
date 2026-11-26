/**
 * 主入口模組（main.js）
 * 直接使用相對路徑匯入專案模組與本地工具模組。
 */
import {
  ALL_CATEGORY,
  ARTICLES,
  getCategories,
  filterArticlesByCategory,
  getDataModuleTag,
} from './data.js';
import {
  renderCategoryFilters,
  renderArticleCards,
  getRenderModuleTag,
} from './render.js';
import { VENDOR_NAME, VENDOR_VERSION } from './vendor/format.js';

const filterBar = document.querySelector('#filterBar');
const articleGrid = document.querySelector('#articleGrid');
const resultCount = document.querySelector('#resultCount');
const scopeCheck = document.querySelector('#scopeCheck');
const vendorInfo = document.querySelector('#vendorInfo');

const categories = getCategories(ARTICLES);
let activeCategory = ALL_CATEGORY;

const updateView = () => {
  const filtered = filterArticlesByCategory(activeCategory, ARTICLES);
  renderCategoryFilters(filterBar, categories, activeCategory);
  renderArticleCards(articleGrid, filtered);
  resultCount.textContent = `目前顯示「${activeCategory}」：共 ${filtered.length} 篇文章`;
};

// 事件委派：篩選按鈕會隨狀態重新渲染，綁在父層容器即可避免重複綁定
filterBar.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;

  activeCategory = button.dataset.category ?? ALL_CATEGORY;
  updateView();
});

// 課堂驗證 1：模組作用域隔離（不污染 window，且同名內部常數 MODULE_TAG 不衝突）
const isIsolated = typeof window.ARTICLES === 'undefined' && typeof window.MODULE_TAG === 'undefined';
scopeCheck.textContent = isIsolated
  ? `變數作用域隔離通過：window.ARTICLES 為 undefined，且兩個模組各自保留同名內部常數（${getDataModuleTag()} / ${getRenderModuleTag()}）。`
  : '警告：偵測到全域變數污染。';

// 課堂驗證 2：透過相對路徑載入本地工具模組
vendorInfo.textContent = `已載入本地工具模組：${VENDOR_NAME} (${VENDOR_VERSION})`;

updateView();
