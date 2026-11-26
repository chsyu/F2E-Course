// 匯入本地 firebaseConfig.js 與 Firebase v13 Modular Firestore
import { db } from './firebaseConfig.js';
import { collection, getDocs, orderBy, query } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const blogsRef = collection(db, 'blogs');

document.querySelector('#mobileMenuBtn')?.addEventListener('click', () => {
  document.querySelector('#navbarNav')?.classList.toggle('is-open');
});

const blogCardsContainer = document.querySelector('#blogCardsContainer');
const loadingIndicator = document.querySelector('#loadingIndicator');

const showLoadError = (message) => {
  // 離線且尚無本地快取時給可操作提示，避免只丟原始錯誤字串
  const offlineHint = !navigator.onLine
    ? '目前離線且尚無快取資料，請先連網載入一次。'
    : `載入文章時發生錯誤：${message}`;
  blogCardsContainer.innerHTML = `<div class="alert">${offlineHint}</div>`;
};

const showEmptyState = () => {
  blogCardsContainer.innerHTML = `
    <div class="empty-state">
      <h2>尚無文章</h2>
      <p>請先上傳 blog 資料</p>
      <a href="upload.html" class="article-back">前往上傳 →</a>
    </div>
  `;
};

const createBlogCard = (blog, blogId) => {
  const dateStr = blog.date || '未知日期';
  const contentPreview = blog.content
    ? (blog.content.length > 90 ? `${blog.content.substring(0, 90)}…` : blog.content)
    : '';
  const mediaHtml = blog.image
    ? `<img src="${blog.image}" alt="${blog.title || ''}" width="640" height="400" loading="lazy">`
    : '';

  blogCardsContainer.insertAdjacentHTML('beforeend', `
    <article class="post-row">
      <a class="post-row__link" href="blog.html?id=${encodeURIComponent(blogId)}">
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

const loadBlogs = async () => {
  try {
    const blogsQuery = query(blogsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(blogsQuery);
    loadingIndicator.classList.add('is-hidden', 'hidden');

    if (querySnapshot.empty) {
      showEmptyState();
      return;
    }

    blogCardsContainer.innerHTML = '';
    querySnapshot.forEach((item) => {
      createBlogCard(item.data(), item.id);
    });
  } catch (error) {
    loadingIndicator.classList.add('is-hidden', 'hidden');
    showLoadError(error.message);
  }
};

loadBlogs();
