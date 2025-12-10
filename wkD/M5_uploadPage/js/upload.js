$(document).ready(function () {
  // Firebase 已在 firebaseConfig.js 中初始化
  // 使用全域 db 變數（從 firebaseConfig.js 匯出）
  let blogsRef = db.collection("blogs");

  // 註冊 DOM 元素
  const $uploadBtn = $('#uploadBtn');
  const $uploadStatus = $('#uploadStatus');
  const $loadingIndicator = $('#loadingIndicator');

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
});
