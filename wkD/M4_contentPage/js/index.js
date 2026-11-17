// 註冊 DOM 元素
const blogCardsContainer = document.querySelector('#blogCardsContainer');

function showEmptyState() {
  blogCardsContainer.innerHTML = `
    <div class="empty-state">
      <h2>尚無文章</h2>
      <p>目前沒有任何文章</p>
    </div>
  `;
}

function loadBlogs() {
  if (typeof blogsData === 'undefined' || !Array.isArray(blogsData) || blogsData.length === 0) {
    showEmptyState();
    return;
  }

  blogCardsContainer.innerHTML = '';
  blogsData.forEach((blog, index) => {
    createBlogCard(blog, index);
  });
}

function createBlogCard(blog, index) {
  const dateStr = blog.date || '未知日期';
  const contentPreview = blog.content
    ? (blog.content.length > 90 ? `${blog.content.substring(0, 90)}…` : blog.content)
    : '';
  const mediaHtml = blog.image
    ? `<img src="${blog.image}" alt="${blog.title || ''}" width="640" height="400" loading="lazy">`
    : '';

  blogCardsContainer.insertAdjacentHTML('beforeend', `
    <article class="post-row">
      <a class="post-row__link" href="blog.html?id=${encodeURIComponent(index)}">
        <div class="post-row__media">${mediaHtml}</div>
        <div class="post-row__body">
          <span class="post-row__category">${blog.category || '未分類'}</span>
          <h2 class="post-row__title">${blog.title || '無標題'}</h2>
          <p class="post-row__preview">${contentPreview}</p>
          <p class="post-row__meta">${blog.author || '匿名'} · ${dateStr}</p>
        </div>
      </a>
    </article>
  `);
}

loadBlogs();
