$(document).ready(function () {
  // 註冊 DOM 元素
  const $blogCardsContainer = $('#blogCardsContainer');
  const $emptyState = $('#emptyState');

  // 載入並顯示部落格
  function loadBlogs() {
    // 檢查 blogsData 是否存在
    if (typeof blogsData === 'undefined' || !Array.isArray(blogsData)) {
      $emptyState.removeClass('hidden');
      return;
    }

    if (blogsData.length === 0) {
      $emptyState.removeClass('hidden');
      return;
    }

    $emptyState.addClass('hidden');
    $blogCardsContainer.html('');

    // 遍歷 blogsData 陣列，使用索引作為 ID
    blogsData.forEach((blog, index) => {
      createBlogCard(blog, index);
    });
  }

  // 建立部落格卡片
  function createBlogCard(blog, index) {
    // 使用原始日期資料（已在 blogs.js 中格式化）
    const dateStr = blog.date || '未知日期';

    // 截斷內容作為預覽 - 只顯示 10 個字元
    let contentPreview = '';
    if (blog.content) {
      if (blog.content.length > 10) {
        contentPreview = blog.content.substring(0, 10) + '... 更多';
      } else {
        contentPreview = blog.content;
      }
    }

    const cardHtml = `
      <div class="mb-6">
        <div class="group transition-all duration-300 cursor-pointer bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
          ${blog.image ? `
            <img src="${blog.image}" class="transition-transform duration-300  w-full h-48 object-cover" alt="${blog.title || ''}">
          ` : `
            <div class="w-full h-48 bg-gray-300 flex items-center justify-center">
              <i class="fas fa-image text-5xl text-gray-400"></i>
            </div>
          `}
          <div class="p-6 flex flex-col flex-grow">
            <div class="mb-3">
              <span class="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">${blog.category || '未分類'}</span>
            </div>
            <h5 class="text-xl font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3em]">${blog.title || '無標題'}</h5>
            <p class="text-gray-600 text-sm flex-grow-1 mb-4 min-h-[2.5em]">${contentPreview}</p>
            <div class="mt-auto">
              <div class="flex justify-between items-center mb-4 text-sm text-gray-500">
                <span>
                  <i class="fas fa-user"></i> ${blog.author || '匿名'}
                </span>
                <span>
                  <i class="fas fa-calendar"></i> ${dateStr}
                </span>
              </div>
              <a href="blog.html?id=${index}" class="block text-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:-translate-y-1 shadow-md">
                <i class="fas fa-arrow-right"></i> 閱讀更多
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    $blogCardsContainer.append(cardHtml);
  }

  // 初始載入
  loadBlogs();
});
