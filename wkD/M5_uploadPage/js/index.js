$(document).ready(function () {
  // Firebase 已在 firebaseConfig.js 中初始化
  // 使用全域 db 變數（從 firebaseConfig.js 匯出）
  let blogsRef = db.collection("blogs");

  // 註冊 DOM 元素
  const $blogCardsContainer = $('#blogCardsContainer');
  const $loadingIndicator = $('#loadingIndicator');

  // 顯示空狀態
  function showEmptyState() {
    const emptyStateHtml = `
      <div class="col-span-full text-center my-12">
        <i class="fas fa-inbox text-6xl text-gray-400 mb-4"></i>
        <h3 class="text-gray-600 text-xl mb-2">尚無文章</h3>
        <p class="text-gray-500 mb-4">請先上傳blog資料</p>
        <a href="upload.html" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:-translate-y-1 shadow-md">
          <i class="fas fa-upload"></i> 前往上傳頁面
        </a>
      </div>
    `;
    $blogCardsContainer.html(emptyStateHtml);
  }

  // 載入並顯示部落格
  function loadBlogs() {
    try {
      blogsRef
        .orderBy('createdAt', 'desc')
        .get()
        .then((querySnapshot) => {
          $loadingIndicator.addClass('hidden');

          if (querySnapshot.empty) {
            showEmptyState();
            return;
          }

          $blogCardsContainer.html('');

          querySnapshot.forEach((doc) => {
            const blog = doc.data();
            const blogId = doc.id;
            createBlogCard(blog, blogId);
          });
        })
        .catch((error) => {
          $loadingIndicator.addClass('hidden');
          $blogCardsContainer.html(`
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <i class="fas fa-exclamation-circle"></i> 載入文章時發生錯誤：${error.message}
            </div>
          `);
        });
    } catch (error) {
      $loadingIndicator.addClass('hidden');
      $blogCardsContainer.html(`
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <i class="fas fa-exclamation-circle"></i> 載入文章時發生錯誤：${error.message}
        </div>
      `);
    }
  }

  // 建立部落格卡片
  function createBlogCard(blog, blogId) {
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
          <img src="${blog.image}" class="transition-transform duration-300  w-full h-48 object-cover" alt="${blog.title || ''}">
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
              <a href="blog.html?id=${blogId}" class="block text-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:-translate-y-1 shadow-md">
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
