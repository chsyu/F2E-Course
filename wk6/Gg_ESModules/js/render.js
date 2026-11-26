/**
 * DOM 渲染模組（js/render.js）
 * 透過相對路徑匯入本地工具模組 ./vendor/format.js。
 */
import { formatDateZh } from './vendor/format.js';

// 與 data.js 同名的內部常數：因為在獨立模組內，不會發生重複宣告錯誤
const MODULE_TAG = 'render-module';

export const getRenderModuleTag = () => MODULE_TAG;

export const renderCategoryFilters = (container, categories, activeCategory) => {
  const fragment = document.createDocumentFragment();

  categories.forEach((category) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = category === activeCategory ? 'btn-filter is-active' : 'btn-filter';
    button.dataset.category = category;
    button.setAttribute('aria-pressed', String(category === activeCategory));
    button.textContent = category;
    fragment.append(button);
  });

  container.replaceChildren(fragment);
};

const createArticleCard = (article) => {
  const card = document.createElement('article');
  card.className = 'card-base';

  const tag = document.createElement('span');
  tag.className = 'card-base__tag';
  tag.textContent = article.category;

  const title = document.createElement('h2');
  title.className = 'card-base__title';
  title.textContent = article.title;

  const summary = document.createElement('p');
  summary.className = 'card-base__summary';
  summary.textContent = article.summary;

  const meta = document.createElement('div');
  meta.className = 'card-base__meta';

  const author = document.createElement('span');
  author.textContent = article.author;

  const date = document.createElement('time');
  date.dateTime = article.date;
  date.textContent = formatDateZh(article.date);

  meta.append(author, date);
  card.append(tag, title, summary, meta);
  return card;
};

export const renderArticleCards = (container, articles) => {
  if (!articles.length) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = '目前沒有符合此分類的文章。';
    container.replaceChildren(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  articles.forEach((article) => {
    fragment.append(createArticleCard(article));
  });

  container.replaceChildren(fragment);
};
