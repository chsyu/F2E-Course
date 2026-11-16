// 註冊 DOM 元素
const blogCardsContainer = document.querySelector('#blogCardsContainer');

function showEmptyState() {
  blogCardsContainer.replaceChildren();
  const empty = document.createElement('div');
  empty.className = 'empty-state';
  const heading = document.createElement('h2');
  heading.textContent = '尚無文章';
  const note = document.createElement('p');
  note.textContent = '目前沒有任何文章';
  empty.append(heading, note);
  blogCardsContainer.append(empty);
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

// 為何用 createElement + textContent：欄位可能含惡意字串，不可拼進 HTML
function createBlogCard(blog, index) {
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
  link.href = `blog.html?id=${encodeURIComponent(index)}`;

  const media = document.createElement('div');
  media.className = 'post-row__media';
  if (blog.image) {
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
