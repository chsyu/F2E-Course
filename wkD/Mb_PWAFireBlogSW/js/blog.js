// 匯入本地 firebaseConfig.js 與 Firebase v13 Modular Firestore
import { db } from './firebaseConfig.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

document.querySelector('#mobileMenuBtn')?.addEventListener('click', () => {
  document.querySelector('#navbarNav')?.classList.toggle('is-open');
});

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

const getBlogIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
};

const showError = (message) => {
  loadingIndicator.classList.add('is-hidden', 'hidden');
  errorText.textContent = message;
  errorMessage.classList.remove('is-hidden', 'hidden');
};

const renderContent = (container, content) => {
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
};

const displayBlog = (blog) => {
  document.title = `${blog.title || 'Blog 文章'} - FireBlog`;

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
};

const loadBlog = async () => {
  const blogId = getBlogIdFromUrl();
  if (!blogId) {
    showError('缺少文章ID參數');
    return;
  }

  const snapshot = await getDoc(doc(db, 'blogs', blogId));
  loadingIndicator.classList.add('is-hidden', 'hidden');

  if (!snapshot.exists()) {
    showError('找不到指定的文章');
    return;
  }

  displayBlog(snapshot.data());
};

loadBlog();
