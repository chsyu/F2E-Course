// Firebase 已在 firebaseConfig.js 中初始化
let blogsRef = db.collection("blogs");

document.querySelector('#mobileMenuBtn').addEventListener('click', function () {
  document.querySelector('#navbarNav').classList.toggle('is-open');
});

const blogCardsContainer = document.querySelector('#blogCardsContainer');
const loadingIndicator = document.querySelector('#loadingIndicator');

function isSafeImageUrl(value) {
  if (!value || typeof value !== 'string') return false;
  try {
    const parsed = new URL(value, window.location.href);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

function showLoadError(message) {
  blogCardsContainer.replaceChildren();
  const box = document.createElement('div');
  box.className = 'alert';
  box.textContent = `載入文章時發生錯誤：${message}`;
  blogCardsContainer.append(box);
}

function showEmptyState() {
  blogCardsContainer.replaceChildren();
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  const heading = document.createElement('h2');
  heading.textContent = '尚無文章';
  const note = document.createElement('p');
  note.textContent = '請先上傳 blog 資料';
  const link = document.createElement('a');
  link.href = 'upload.html';
  link.className = 'article-back';
  link.textContent = '前往上傳 →';
  empty.append(heading, note, link);
  blogCardsContainer.append(empty);
}

function loadBlogs() {
  try {
    blogsRef
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        loadingIndicator.classList.add('is-hidden', 'hidden');

        if (querySnapshot.empty) {
          showEmptyState();
          return;
        }

        blogCardsContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
          createBlogCard(doc.data(), doc.id);
        });
      })
      .catch((error) => {
        loadingIndicator.classList.add('is-hidden', 'hidden');
        showLoadError(error.message);
      });
  } catch (error) {
    loadingIndicator.classList.add('is-hidden', 'hidden');
    showLoadError(error.message);
  }
}

function createBlogCard(blog, blogId) {
  const dateStr = blog.date || '未知日期';
  let contentPreview = '';
  if (blog.content) {
    contentPreview = blog.content.length > 90
      ? `${blog.content.substring(0, 90)}…`
      : blog.content;
  }

  const row = document.createElement('article');
  row.className = 'post-row';

  const link = document.createElement('a');
  link.className = 'post-row__link';
  link.href = `blog.html?id=${encodeURIComponent(blogId)}`;

  const media = document.createElement('div');
  media.className = 'post-row__media';
  if (blog.image && isSafeImageUrl(blog.image)) {
    const img = document.createElement('img');
    img.src = blog.image;
    img.alt = blog.title || '';
    img.width = 640;
    img.height = 400;
    img.loading = 'lazy';
    media.append(img);
  }

  const body = document.createElement('div');
  body.className = 'post-row__body';

  const category = document.createElement('span');
  category.className = 'post-row__category';
  category.textContent = blog.category || '未分類';

  const title = document.createElement('h2');
  title.className = 'post-row__title';
  title.textContent = blog.title || '無標題';

  const preview = document.createElement('p');
  preview.className = 'post-row__preview';
  preview.textContent = contentPreview;

  const meta = document.createElement('p');
  meta.className = 'post-row__meta';
  meta.textContent = `${blog.author || '匿名'} · ${dateStr}`;

  body.append(category, title, preview, meta);
  link.append(media, body);
  row.append(link);
  blogCardsContainer.append(row);
}

loadBlogs();
