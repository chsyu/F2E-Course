/**
 * 共用的 UI 互動功能
 * 處理所有頁面共用的 JavaScript 互動邏輯
 */

$(document).ready(function () {
  // Mobile menu toggle
  $('#mobileMenuBtn').on('click', function () {
    $('#mobileMenu').toggleClass('hidden');
  });
});

