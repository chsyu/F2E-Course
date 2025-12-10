$(document).ready(function () {
  // 註冊 DOM 元素
  const $errorMessage = $('#errorMessage');
  const $errorText = $('#errorText');
  const $blogContent = $('#blogContent');
  const $blogImageContainer = $('#blogImageContainer');
  const $blogCategory = $('#blogCategory');
  const $blogTitle = $('#blogTitle');
  const $blogAuthor = $('#blogAuthor');
  const $blogDate = $('#blogDate');
  const $blogContentText = $('#blogContentText');

  // 從 URL 參數取得部落格索引
  function getBlogIndexFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('id');
    return index !== null ? parseInt(index, 10) : null;
  }

  // 載入部落格內容
  function loadBlog() {
    const blogIndex = getBlogIndexFromUrl();
    const blog = blogsData[blogIndex];
    displayBlog(blog);
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

    $blogImageContainer.html(`
      <img src="${blog.image}" class="w-full max-h-[500px] object-cover" alt="${blog.title || ''}">
    `);
    $blogCategory.text(blog.category);
    $blogTitle.text(blog.title);
    $blogAuthor.text(blog.author);
    $blogDate.text(blog.date);

    // 顯示格式化後的內容（使用 Tailwind 類別處理段落樣式）
    const formattedContent = formatContent(blog.content || '');
    $blogContentText.addClass('text-lg leading-relaxed text-gray-800 [&>p:first-child]:text-xl [&>p:first-child]:text-gray-700 [&>p]:mb-6 [&>p]:text-justify').html(formattedContent);

    // 顯示部落格內容
    $blogContent.removeClass('hidden');
  }

  // 初始載入
  loadBlog();
});
