// Firebase 已在 firebaseConfig.js 中初始化
// 使用全域 db 變數（從 firebaseConfig.js 匯出）
let blogsRef = db.collection("blogs");

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
        loadingIndicator.classList.add('hidden');

        if (!doc.exists) {
          showError('找不到指定的文章');
          return;
        }

        const blog = doc.data();
        displayBlog(blog);
      })
      .catch((error) => {
        loadingIndicator.classList.add('hidden');
        showError('載入文章時發生錯誤：' + error.message);
      });
  } catch (error) {
    loadingIndicator.classList.add('hidden');
    showError('載入文章時發生錯誤：' + error.message);
  }
}

// 格式化內容，加入適當的段落換行
function formatContent(content) {
  if (!content) return '無內容';
  
  // 以雙換行符號分割段落
  const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  
  if (paragraphs.length === 0) {
    // 如果沒有雙換行符號，則以單換行符號分割
    const lines = content.split(/\n/).filter(l => l.trim().length > 0);
    return lines.map(line => `<p>${line.trim()}</p>`).join('');
  }
  
  return paragraphs.map(para => {
    // 將段落內的單換行符號替換為 <br>
    const formatted = para.replace(/\n/g, '<br>');
    return `<p>${formatted.trim()}</p>`;
  }).join('');
}

// 顯示部落格內容
function displayBlog(blog) {
  // 設定頁面標題
  document.title = (blog.title || 'Blog 文章') + ' - FireBlog';

  // 顯示圖片
  if (blog.image) {
    blogImageContainer.innerHTML = `
      <img src="${blog.image}" class="w-full max-h-[500px] object-cover" alt="${blog.title || ''}">
    `;
  } else {
    blogImageContainer.innerHTML = `
      <div class="w-full h-64 bg-gray-300 flex items-center justify-center">
        <i class="fas fa-image text-6xl text-gray-400"></i>
      </div>
    `;
  }

  // 顯示分類
  if (blog.category) {
    blogCategory.textContent = blog.category;
    blogCategory.classList.remove('hidden');
  } else {
    blogCategory.classList.add('hidden');
  }

  // 顯示標題
  blogTitle.textContent = blog.title || '無標題';

  // 顯示作者
  blogAuthor.textContent = blog.author || '匿名';

  // 顯示日期（使用原始日期資料，已在 blogs.js 中格式化）
  blogDate.textContent = blog.date || '未知日期';

  // 顯示格式化後的內容（使用 Tailwind 類別處理段落樣式）
  const formattedContent = formatContent(blog.content || '');
  blogContentText.classList.add('text-lg', 'leading-relaxed', 'text-gray-800', '[&>p:first-child]:text-xl', '[&>p:first-child]:text-gray-700', '[&>p]:mb-6', '[&>p]:text-justify');
  blogContentText.innerHTML = formattedContent;

  // 顯示部落格內容
  blogContent.classList.remove('hidden');
}

// 顯示錯誤訊息
function showError(message) {
  loadingIndicator.classList.add('hidden');
  errorText.textContent = message;
  errorMessage.classList.remove('hidden');
}

// 初始載入
loadBlog();
