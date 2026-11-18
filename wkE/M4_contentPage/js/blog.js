// 註冊 DOM 元素
const errorMessage = document.querySelector('#errorMessage');
const errorText = document.querySelector('#errorText');
const blogContent = document.querySelector('#blogContent');
const blogImageContainer = document.querySelector('#blogImageContainer');
const blogCategory = document.querySelector('#blogCategory');
const blogTitle = document.querySelector('#blogTitle');
const blogAuthor = document.querySelector('#blogAuthor');
const blogDate = document.querySelector('#blogDate');
const blogContentText = document.querySelector('#blogContentText');

// 從 URL 參數取得部落格索引
function getBlogIndexFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const index = urlParams.get('id');
  return index !== null ? parseInt(index, 10) : null;
}

// 載入部落格內容
function loadBlog() {
  const blogIndex = getBlogIndexFromUrl();

  if (blogIndex === null) {
    showError('缺少文章ID參數');
    return;
  }

  // 檢查 blogsData 是否存在
  if (typeof blogsData === 'undefined' || !Array.isArray(blogsData)) {
    showError('無法載入部落格資料');
    return;
  }

  // 檢查索引是否有效
  if (isNaN(blogIndex) || blogIndex < 0 || blogIndex >= blogsData.length) {
    showError('找不到指定的文章');
    return;
  }

  const blog = blogsData[blogIndex];
  displayBlog(blog);
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
  document.title = (blog.title || 'Blog 文章') + ' - SupaBlog';

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
  errorText.textContent = message;
  errorMessage.classList.remove('is-hidden', 'hidden');
}

// 初始載入
loadBlog();
