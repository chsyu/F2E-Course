$(document).ready(function () {
  // Firebase 已在 firebaseConfig.js 中初始化
  // 使用全域 db 變數（從 firebaseConfig.js 匯出）
  let blogsRef = db.collection("blogs");

  // 註冊 DOM 元素
  const $uploadBtn = $('#uploadBtn');
  const $uploadStatus = $('#uploadStatus');
  const $loadingIndicator = $('#loadingIndicator');
  const $blogListContainer = $('#blogListContainer');
  const $listLoadingIndicator = $('#listLoadingIndicator');
  const $emptyListState = $('#emptyListState');
  const $blogCount = $('#blogCount strong');

  // 使用 onSnapshot 監聽文章列表變化
  function setupBlogListListener() {
    $listLoadingIndicator.removeClass('hidden');
    $blogListContainer.addClass('hidden');
    $emptyListState.addClass('hidden');

    blogsRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          $listLoadingIndicator.addClass('hidden');

          // 更新文章總數
          const totalCount = querySnapshot.size;
          $blogCount.text(totalCount);

          if (querySnapshot.empty) {
            $emptyListState.removeClass('hidden');
            $blogListContainer.addClass('hidden');
            return;
          }

          $emptyListState.addClass('hidden');
          $blogListContainer.removeClass('hidden');
          $blogListContainer.html('');

          querySnapshot.forEach((doc) => {
            const blog = doc.data();
            const blogId = doc.id;
            createBlogListItem(blog, blogId);
          });
        },
        (error) => {
          console.error('監聽文章列表時發生錯誤:', error);
          $listLoadingIndicator.addClass('hidden');
          $blogListContainer.html(`
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <i class="fas fa-exclamation-circle"></i> 載入文章列表時發生錯誤：${error.message}
            </div>
          `);
        }
      );
  }

  // 建立文章列表項目
  function createBlogListItem(blog, blogId) {
    // 格式化上傳時間
    let uploadTimeStr = '未知時間';
    if (blog.createdAt && blog.createdAt.toDate) {
      const uploadTime = blog.createdAt.toDate();
      uploadTimeStr = uploadTime.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }

    const listItemHtml = `
      <div class="border-b border-gray-200 py-4 hover:bg-gray-50 transition-colors" data-blog-id="${blogId}">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              <a href="blog.html?id=${blogId}" class="hover:text-blue-600 transition-colors">
                ${blog.title || '無標題'}
              </a>
            </h3>
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>
                <i class="fas fa-user mr-1"></i> ${blog.author || '匿名'}
              </span>
              <span>
                <i class="fas fa-calendar mr-1"></i> ${blog.date || '未知日期'}
              </span>
              <span>
                <i class="fas fa-clock mr-1"></i> ${uploadTimeStr}
              </span>
              ${blog.category ? `
                <span class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  ${blog.category}
                </span>
              ` : ''}
            </div>
          </div>
          <div class="ml-4">
            <button type="button" 
                    class="delete-blog-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    data-blog-id="${blogId}"
                    title="刪除此文章">
              <i class="fas fa-trash-alt"></i> 刪除
            </button>
          </div>
        </div>
      </div>
    `;

    $blogListContainer.append(listItemHtml);
  }

  // 刪除單篇文章
  function deleteBlog(blogId) {
    if (!confirm('確定要刪除此文章嗎？')) {
      return;
    }

    blogsRef
      .doc(blogId)
      .delete()
      .then(() => {
        // 刪除成功，onSnapshot 會自動更新列表
        console.log('文章已刪除');
      })
      .catch((error) => {
        console.error('刪除文章時發生錯誤:', error);
        alert('刪除文章時發生錯誤：' + error.message);
      });
  }

  // 刪除全部文章
  function deleteAllBlogs() {
    const totalCount = parseInt($blogCount.text()) || 0;
    
    if (totalCount === 0) {
      alert('目前沒有任何文章可以刪除');
      return;
    }

    if (!confirm(`確定要刪除全部 ${totalCount} 篇文章嗎？此操作無法復原！`)) {
      return;
    }

    const $deleteAllBtn = $('#deleteAllBtn');
    $deleteAllBtn.prop('disabled', true);
    $deleteAllBtn.html('<i class="fas fa-spinner fa-spin"></i> 刪除中...');

    // 取得所有文章
    blogsRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          alert('目前沒有任何文章可以刪除');
          $deleteAllBtn.prop('disabled', false);
          $deleteAllBtn.html('<i class="fas fa-trash-alt"></i> 刪除全部文章');
          return;
        }

        // 批次刪除
        let batch = db.batch();
        querySnapshot.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => {
        // 刪除成功，onSnapshot 會自動更新列表
        $deleteAllBtn.prop('disabled', false);
        $deleteAllBtn.html('<i class="fas fa-trash-alt"></i> 刪除全部文章');
        alert('所有文章已成功刪除');
      })
      .catch((error) => {
        console.error('刪除全部文章時發生錯誤:', error);
        alert('刪除全部文章時發生錯誤：' + error.message);
        $deleteAllBtn.prop('disabled', false);
        $deleteAllBtn.html('<i class="fas fa-trash-alt"></i> 刪除全部文章');
      });
  }

  // 使用事件委派處理動態生成的刪除按鈕
  $blogListContainer.on('click', '.delete-blog-btn', function () {
    const blogId = $(this).data('blog-id');
    if (blogId) {
      deleteBlog(blogId);
    }
  });

  // 處理刪除全部按鈕點擊
  $('#deleteAllBtn').on('click', function () {
    deleteAllBlogs();
  });

  // 處理上傳按鈕點擊
  $uploadBtn.on('click', function () {
    try {
      // 顯示 spinner
      $loadingIndicator.removeClass('hidden');
      $uploadBtn.prop('disabled', true);
      $uploadStatus.html('');

      // 上傳部落格到 Firestore
      uploadBlogs(blogsData);
    } catch (error) {
      $loadingIndicator.addClass('hidden');
      $uploadBtn.prop('disabled', false);
      $uploadStatus.html(`
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <i class="fas fa-times-circle"></i> 上傳時發生錯誤：${error.message}
        </div>
      `);
    }
  });

  // 上傳部落格到 Firestore
  function uploadBlogs(blogs) {
    let batch = db.batch();

    blogs.forEach((blog) => {
      // 加入時間戳記
      const blogData = {
        ...blog,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };

      // 建立新的文件參照
      const docRef = blogsRef.doc();
      batch.set(docRef, blogData);
    });

    // 提交批次
    batch.commit()
      .then(() => {
        $loadingIndicator.addClass('hidden');
        $uploadBtn.prop('disabled', false);
        $uploadStatus.html(`
          <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            <i class="fas fa-check-circle"></i> 成功上傳 ${blogs.length} 篇文章到 Firestore！
          </div>
        `);
      })
      .catch((error) => {
        $loadingIndicator.addClass('hidden');
        $uploadBtn.prop('disabled', false);
        $uploadStatus.html(`
          <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <i class="fas fa-times-circle"></i> 上傳時發生錯誤：${error.message}
          </div>
        `);
      });
  }

  // 初始化：開始監聽文章列表
  setupBlogListListener();
});
