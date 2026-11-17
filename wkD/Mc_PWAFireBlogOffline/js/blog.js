// Firebase 已在 firebaseConfig.js 中初始化
// 使用全域 db 變數（從 firebaseConfig.js 匯出）
let blogsRef = db.collection("blogs");

// Mobile menu toggle
document.querySelector('#mobileMenuBtn').addEventListener('click', function () {
  document.querySelector('#navbarNav').classList.toggle('is-open');
});

// 註冊 DOM 元素
const loadingIndicator = document.querySelector('#loadingIndicator');
const errorMessage = document.querySelector('#errorMessage');
const errorText = document.querySelector('#errorText');
const blogContent = document.querySelector('#blogContent');
const blogImageContainer = document.querySelector('#blogImageContainer');
const blogCategory = document.querySelector('#blogCategory');
const blogTitle = document.querySelector('#blogTitle');
const blogAuthor = document.querySelector('#blogAuthor');
const blogDate = document.querySelector('#blogDate');
const blogContentText = document.querySelector('#blogContentText');

// 從 URL 參數取得部落格 ID
function getBlogIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

// 載入部落格內容
function loadBlog() {
  const blogId = getBlogIdFromUrl();

  if (!blogId) {
    showError('缺少文章ID參數');
    return;
  }

  try {
    blogsRef
      .doc(blogId)
      .get()
      .then((doc) => {
        loadingIndicator.classList.add('is-hidden', 'hidden');

        if (!doc.exists) {
          showError('找不到指定的文章');
          return;
        }

        const blog = doc.data();
        displayBlog(blog);
      })
      .catch((error) => {
        loadingIndicator.classList.add('is-hidden', 'hidden');
        showError('載入文章時發生錯誤：' + error.message);
      });
  } catch (error) {
    loadingIndicator.classList.add('is-hidden', 'hidden');
    showError('載入文章時發生錯誤：' + error.message);
  }
}

// 以空行分段；段落內換行轉成 <br>
function renderContent(container, content) {
  if (!content) {
    container.innerHTML = '<p>無內容</p>';
    return;
  }

  const html = content
    .split(/\n\s*\n/)
    .filter((p) => p.trim())
    .map((p) => `<p>${p.trim().replace(/\n/g, '<br>')}</p>`)
    .join('');

  container.innerHTML = html || '<p>無內容</p>';
}

function displayBlog(blog) {
  document.title = (blog.title || 'Blog 文章') + ' - FireBlog';

  blogImageContainer.innerHTML = blog.image
    ? `<img src="${blog.image}" alt="${blog.title || ''}" width="1600" height="900" fetchpriority="high">`
    : '<div class="article-hero__placeholder">No image</div>';

  if (blog.category) {
    blogCategory.textContent = blog.category;
    blogCategory.classList.remove('is-hidden', 'hidden');
  } else {
    blogCategory.classList.add('is-hidden');
  }

  blogTitle.textContent = blog.title || '無標題';
  blogAuthor.textContent = blog.author || '匿名';
  blogDate.textContent = blog.date || '未知日期';

  renderContent(blogContentText, blog.content || '');
  blogContent.classList.remove('is-hidden', 'hidden');
}

function showError(message) {
  loadingIndicator.classList.add('is-hidden', 'hidden');
  errorText.textContent = !navigator.onLine
    ? '目前離線且尚無快取資料，請先連網載入一次後再開啟此文章。'
    : message;
  errorMessage.classList.remove('is-hidden', 'hidden');
}

// 初始載入
loadBlog();
