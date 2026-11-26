import { blogsData } from './blogs.js';

const blogCardsContainer = document.querySelector('#blogCardsContainer');

const showEmptyState = () => {
  blogCardsContainer.innerHTML = `
    <div class="empty-state">
      <h2>尚無文章</h2>
      <p>目前沒有任何文章</p>
    </div>
  `;
};

const createBlogCard = (blog) => {
  const dateStr = blog.date || '未知日期';
  const contentPreview = blog.content
    ? (blog.content.length > 90 ? `${blog.content.substring(0, 90)}…` : blog.content)
    : '';
  const mediaHtml = blog.image
    ? `<img src="${blog.image}" alt="${blog.title || ''}" width="640" height="400" loading="lazy">`
    : '';

  // 教學註記：此處為本機靜態假資料，允許使用樣板字面值搭配 insertAdjacentHTML 聚焦模組拆檔重點
  blogCardsContainer.insertAdjacentHTML('beforeend', `
    <article class="post-row">
      <a class="post-row__link" href="#">
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
};

if (!Array.isArray(blogsData) || blogsData.length === 0) {
  showEmptyState();
} else {
  blogCardsContainer.innerHTML = '';
  blogsData.forEach((blog) => {
    createBlogCard(blog);
  });
}
