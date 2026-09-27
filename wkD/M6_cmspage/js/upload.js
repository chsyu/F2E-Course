// Firebase 已在 firebaseConfig.js 中初始化
// 使用全域 db 變數（從 firebaseConfig.js 匯出）
let blogsRef = db.collection("blogs");

// 註冊 DOM 元素
const uploadBtn = document.querySelector('#uploadBtn');
const uploadStatus = document.querySelector('#uploadStatus');
const loadingIndicator = document.querySelector('#loadingIndicator');
const blogListContainer = document.querySelector('#blogListContainer');
const listLoadingIndicator = document.querySelector('#listLoadingIndicator');
const emptyListState = document.querySelector('#emptyListState');
const blogCount = document.querySelector('#blogCount strong');
const deleteAllBtn = document.querySelector('#deleteAllBtn');

// 使用 onSnapshot 監聽文章列表變化
function setupBlogListListener() {
  listLoadingIndicator.classList.remove('hidden');
  blogListContainer.classList.add('hidden');
  emptyListState.classList.add('hidden');

  blogsRef
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (querySnapshot) => {
        listLoadingIndicator.classList.add('hidden');

        // 更新文章總數
        const totalCount = querySnapshot.size;
        blogCount.textContent = totalCount;

        if (querySnapshot.empty) {
          emptyListState.classList.remove('hidden');
          blogListContainer.classList.add('hidden');
          return;
        }

        emptyListState.classList.add('hidden');
        blogListContainer.classList.remove('hidden');
        blogListContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
          const blog = doc.data();
          const blogId = doc.id;
          createBlogListItem(blog, blogId);
        });
      },
      (error) => {
        console.error('監聽文章列表時發生錯誤:', error);
        listLoadingIndicator.classList.add('hidden');
        blogListContainer.innerHTML = `
          <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <i class="fas fa-exclamation-circle"></i> 載入文章列表時發生錯誤：${error.message}
          </div>
        `;
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
              <span class="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-sm text-xs">
                ${blog.category}
              </span>
            ` : ''}
          </div>
        </div>
        <div class="ml-4">
          <button type="button" 
                  class="delete-blog-btn cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  data-blog-id="${blogId}"
                  title="刪除此文章">
            <i class="fas fa-trash-alt"></i> 刪除
          </button>
        </div>
      </div>
    </div>
  `;

  blogListContainer.insertAdjacentHTML('beforeend', listItemHtml);
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
  const totalCount = parseInt(blogCount.textContent) || 0;
  
  if (totalCount === 0) {
    alert('目前沒有任何文章可以刪除');
    return;
  }

  if (!confirm(`確定要刪除全部 ${totalCount} 篇文章嗎？此操作無法復原！`)) {
    return;
  }

  deleteAllBtn.disabled = true;
  deleteAllBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 刪除中...';

  // 取得所有文章
  blogsRef
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        alert('目前沒有任何文章可以刪除');
        deleteAllBtn.disabled = false;
        deleteAllBtn.innerHTML = '<i class="fas fa-trash-alt"></i> 刪除全部文章';
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
      deleteAllBtn.disabled = false;
      deleteAllBtn.innerHTML = '<i class="fas fa-trash-alt"></i> 刪除全部文章';
      alert('所有文章已成功刪除');
    })
    .catch((error) => {
      console.error('刪除全部文章時發生錯誤:', error);
      alert('刪除全部文章時發生錯誤：' + error.message);
      deleteAllBtn.disabled = false;
      deleteAllBtn.innerHTML = '<i class="fas fa-trash-alt"></i> 刪除全部文章';
    });
}

// 刪除按鈕是動態產生的元素，所以把事件委派給 blogListContainer
blogListContainer.addEventListener('click', function (e) {
  const deleteBtn = e.target.closest('.delete-blog-btn');
  if (!deleteBtn) return;

  const blogId = deleteBtn.dataset.blogId;
  if (blogId) {
    deleteBlog(blogId);
  }
});

// 處理刪除全部按鈕點擊
deleteAllBtn.addEventListener('click', function () {
  deleteAllBlogs();
});

// 處理上傳按鈕點擊
uploadBtn.addEventListener('click', function () {
  try {
    // 顯示 spinner
    loadingIndicator.classList.remove('hidden');
    uploadBtn.disabled = true;
    uploadStatus.innerHTML = '';

    // 上傳部落格到 Firestore
    uploadBlogs(blogsData);
  } catch (error) {
    loadingIndicator.classList.add('hidden');
    uploadBtn.disabled = false;
    uploadStatus.innerHTML = `
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <i class="fas fa-times-circle"></i> 上傳時發生錯誤：${error.message}
      </div>
    `;
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
      loadingIndicator.classList.add('hidden');
      uploadBtn.disabled = false;
      uploadStatus.innerHTML = `
        <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <i class="fas fa-check-circle"></i> 成功上傳 ${blogs.length} 篇文章到 Firestore！
        </div>
      `;
    })
    .catch((error) => {
      loadingIndicator.classList.add('hidden');
      uploadBtn.disabled = false;
      uploadStatus.innerHTML = `
        <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <i class="fas fa-times-circle"></i> 上傳時發生錯誤：${error.message}
        </div>
      `;
    });
}

// 初始化：開始監聽文章列表
setupBlogListListener();
