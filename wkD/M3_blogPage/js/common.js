/**
 * 共用的 UI 互動功能
 * 處理所有頁面共用的 JavaScript 互動邏輯
 */

// Mobile menu toggle
document.querySelector('#mobileMenuBtn').addEventListener('click', function () {
  document.querySelector('#mobileMenu').classList.toggle('hidden');
});
