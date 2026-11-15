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

// 為何用 URL + 基底：相對路徑可解析成 http(s)，並擋掉 javascript: 等危險 scheme
function isSafeImageUrl(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const parsed = new URL(value, window.location.href);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

// 為何用 DOM 組裝：內文來自 Firestore，不可拼進 HTML 字串以免 XSS；仍保留段落／換行結構
function renderContent(container, content) {
  container.replaceChildren();

  if (!content) {
    const empty = document.createElement('p');
    empty.textContent = '無內容';
    container.append(empty);
    return;
  }

  const appendParagraph = function (text) {
    const p = document.createElement('p');
    const lines = text.split('\n');
    lines.forEach(function (line, index) {
      if (index > 0) p.append(document.createElement('br'));
      p.append(document.createTextNode(line));
    });
    container.append(p);
  };

  const paragraphs = content.split(/\n\s*\n/).filter(function (p) {
    return p.trim().length > 0;
  });

  if (paragraphs.length === 0) {
    content.split(/\n/).filter(function (l) {
      return l.trim().length > 0;
    }).forEach(function (line) {
      appendParagraph(line.trim());
    });
    return;
  }

  paragraphs.forEach(function (para) {
    appendParagraph(para.trim());
  });
}

// 顯示部落格內容
function displayBlog(blog) {
  // 設定頁面標題
  document.title = (blog.title || 'Blog 文章') + ' - FireBlog';

  blogImageContainer.replaceChildren();
  if (blog.image && isSafeImageUrl(blog.image)) {
    const img = document.createElement('img');
    img.src = blog.image;
    img.alt = blog.title || '';
    img.width = 1600;
    img.height = 900;
    img.fetchPriority = 'high';
    blogImageContainer.append(img);
  } else {
    const placeholder = document.createElement('div');
    placeholder.className = 'article-hero__placeholder';
    placeholder.textContent = 'No image';
    blogImageContainer.append(placeholder);
  }

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
