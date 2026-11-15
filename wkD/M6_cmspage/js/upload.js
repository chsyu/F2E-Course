/**
 * 部落格資料
 * 包含 10 篇部落格文章的資料
 */
const blogsData = [
  {
    "title": "探索前端開發的無限可能",
    "author": "張小明",
    "date": "2024年1月15日",
    "content": "前端開發是一個充滿創意和挑戰的領域。從HTML、CSS到JavaScript，每一個技術都有其獨特的魅力。在這個數位時代，前端開發者不僅需要掌握技術，更需要理解用戶體驗和設計思維。讓我們一起探索前端開發的無限可能，創造出令人驚艷的網頁應用。",
    "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    "category": "前端開發"
  },
  {
    "title": "Firebase實戰：建立即時應用程式",
    "author": "李美麗",
    "date": "2024年1月20日",
    "content": "Firebase是Google提供的強大後端服務平台，讓開發者能夠快速建立即時應用程式。無論是Firestore資料庫、Authentication認證，還是Storage儲存服務，Firebase都提供了完整的解決方案。本文將帶你深入了解如何使用Firebase建立一個功能完整的應用程式，並分享實際開發中的經驗和技巧。",
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    "category": "後端服務"
  },
  {
    "title": "響應式設計的最佳實踐",
    "author": "王建國",
    "date": "2024年1月25日",
    "content": "在行動裝置普及的今天，響應式設計已經成為網頁開發的標準。一個好的響應式設計不僅要適應不同螢幕尺寸，更要考慮用戶的使用情境和操作習慣。本文將分享響應式設計的核心概念、實作技巧，以及如何利用CSS Grid和Flexbox等現代CSS技術來建立靈活的版面配置。",
    "image": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800",
    "category": "網頁設計"
  },
  {
    "title": "JavaScript ES6+ 新特性解析",
    "author": "陳雅文",
    "date": "2024年2月1日",
    "content": "ES6（ECMAScript 2015）為JavaScript帶來了許多革命性的改變，包括箭頭函數、解構賦值、Promise、async/await等。這些新特性不僅讓程式碼更簡潔易讀，也提升了開發效率。本文將深入解析這些新特性的使用場景和最佳實踐，幫助你寫出更現代化的JavaScript程式碼。",
    "image": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800",
    "category": "程式語言"
  },
  {
    "title": "UI/UX設計原則：創造優秀的使用者體驗",
    "author": "林志強",
    "date": "2024年2月5日",
    "content": "優秀的使用者體驗是產品成功的關鍵。UI/UX設計不僅僅是讓介面看起來美觀，更重要的是要理解用戶的需求和行為模式。從資訊架構到互動設計，從視覺層次到微互動，每一個細節都影響著用戶的使用體驗。讓我們一起學習如何創造出既美觀又實用的使用者介面。",
    "image": "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    "category": "設計"
  },
  {
    "title": "Git版本控制完全指南",
    "author": "黃淑芬",
    "date": "2024年2月10日",
    "content": "Git是現代軟體開發中不可或缺的版本控制工具。無論是個人專案還是團隊協作，Git都能幫助你有效管理程式碼的變更歷史。從基本的add、commit、push操作，到進階的branch、merge、rebase技巧，本文將帶你從零開始學習Git，並分享實際開發中的最佳實踐。",
    "image": "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800",
    "category": "開發工具"
  },
  {
    "title": "CSS動畫與過渡效果實戰",
    "author": "吳大偉",
    "date": "2024年2月15日",
    "content": "CSS動畫和過渡效果能夠為網頁增添生動的視覺體驗。從簡單的hover效果到複雜的關鍵影格動畫，CSS提供了豐富的動畫功能。本文將介紹CSS transitions和animations的使用方法，並分享如何創造出流暢自然的動畫效果，讓你的網頁更加吸引人。",
    "image": "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
    "category": "前端開發"
  },
  {
    "title": "RESTful API設計與實作",
    "author": "鄭文華",
    "date": "2024年2月20日",
    "content": "RESTful API是現代Web應用程式之間通訊的標準方式。一個設計良好的API不僅要符合REST原則，更要考慮安全性、效能和可維護性。本文將介紹RESTful API的設計原則、HTTP方法的正確使用，以及如何實作一個完整的API系統，並分享實際開發中的經驗和注意事項。",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    "category": "後端開發"
  },
  {
    "title": "前端效能優化技巧",
    "author": "周美玲",
    "date": "2024年2月25日",
    "content": "網頁效能直接影響用戶體驗和SEO排名。從圖片優化、程式碼壓縮到快取策略，有許多方法可以提升網頁的載入速度和執行效率。本文將分享前端效能優化的實用技巧，包括如何減少HTTP請求、優化JavaScript執行、使用CDN加速等，幫助你建立更快更流暢的網頁應用。",
    "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    "category": "效能優化"
  },
  {
    "title": "現代前端框架比較：React vs Vue vs Angular",
    "author": "蔡明哲",
    "date": "2024年3月1日",
    "content": "React、Vue和Angular是當今最受歡迎的前端框架，每個框架都有其獨特的優勢和適用場景。React以組件化和虛擬DOM著稱，Vue以易學易用和漸進式設計聞名，Angular則提供了完整的企業級解決方案。本文將深入比較這三個框架的特點、生態系統和學習曲線，幫助你選擇最適合的框架。",
    "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    "category": "前端框架"
  }
];

// Firebase 已在 firebaseConfig.js 中初始化
let blogsRef = db.collection("blogs");

document.querySelector('#mobileMenuBtn').addEventListener('click', function () {
  document.querySelector('#navbarNav').classList.toggle('is-open');
});

const uploadBtn = document.querySelector('#uploadBtn');
const uploadStatus = document.querySelector('#uploadStatus');
const loadingIndicator = document.querySelector('#loadingIndicator');
const blogListContainer = document.querySelector('#blogListContainer');
const listLoadingIndicator = document.querySelector('#listLoadingIndicator');
const emptyListState = document.querySelector('#emptyListState');
const blogCount = document.querySelector('#blogCount strong');
const deleteAllBtn = document.querySelector('#deleteAllBtn');

function showUploadStatus(type, message) {
  uploadStatus.replaceChildren();
  const box = document.createElement('div');
  box.className = type === 'error' ? 'status-box status-box--error' : 'status-box status-box--ok';
  box.textContent = message;
  uploadStatus.append(box);
}

function showListError(message) {
  blogListContainer.replaceChildren();
  blogListContainer.classList.remove('is-hidden', 'hidden');
  const box = document.createElement('div');
  box.className = 'alert';
  box.textContent = `載入文章列表時發生錯誤：${message}`;
  blogListContainer.append(box);
}

function setupBlogListListener() {
  listLoadingIndicator.classList.remove('is-hidden', 'hidden');
  blogListContainer.classList.add('is-hidden', 'hidden');
  emptyListState.classList.add('is-hidden', 'hidden');

  blogsRef
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (querySnapshot) => {
        listLoadingIndicator.classList.add('is-hidden', 'hidden');
        blogCount.textContent = querySnapshot.size;

        if (querySnapshot.empty) {
          emptyListState.classList.remove('is-hidden', 'hidden');
          blogListContainer.classList.add('is-hidden', 'hidden');
          return;
        }

        emptyListState.classList.add('is-hidden', 'hidden');
        blogListContainer.classList.remove('is-hidden', 'hidden');
        blogListContainer.innerHTML = '';

        querySnapshot.forEach((doc) => {
          createBlogListItem(doc.data(), doc.id);
        });
      },
      (error) => {
        console.error('監聽文章列表時發生錯誤:', error);
        listLoadingIndicator.classList.add('is-hidden', 'hidden');
        showListError(error.message);
      }
    );
}

function createBlogListItem(blog, blogId) {
  let uploadTimeStr = '未知時間';
  if (blog.createdAt && blog.createdAt.toDate) {
    uploadTimeStr = blog.createdAt.toDate().toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const item = document.createElement('div');
  item.className = 'cms-item';
  item.dataset.blogId = blogId;

  const info = document.createElement('div');
  const heading = document.createElement('h3');
  heading.className = 'cms-item__title';
  const titleLink = document.createElement('a');
  titleLink.href = `blog.html?id=${encodeURIComponent(blogId)}`;
  titleLink.textContent = blog.title || '無標題';
  heading.append(titleLink);

  const meta = document.createElement('p');
  meta.className = 'cms-item__meta';
  const categoryPart = blog.category ? ` · ${blog.category}` : '';
  meta.textContent = `${blog.author || '匿名'} · ${blog.date || '未知日期'} · ${uploadTimeStr}${categoryPart}`;

  info.append(heading, meta);

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-blog-btn btn btn-danger btn-sm';
  deleteBtn.dataset.blogId = blogId;
  deleteBtn.title = '刪除此文章';
  deleteBtn.textContent = '刪除';

  item.append(info, deleteBtn);
  blogListContainer.append(item);
}

function deleteBlog(blogId) {
  if (!confirm('確定要刪除此文章嗎？')) return;

  blogsRef
    .doc(blogId)
    .delete()
    .then(() => {
      console.log('文章已刪除');
    })
    .catch((error) => {
      console.error('刪除文章時發生錯誤:', error);
      alert('刪除文章時發生錯誤：' + error.message);
    });
}

function deleteAllBlogs() {
  const totalCount = parseInt(blogCount.textContent, 10) || 0;

  if (totalCount === 0) {
    alert('目前沒有任何文章可以刪除');
    return;
  }

  if (!confirm(`確定要刪除全部 ${totalCount} 篇文章嗎？此操作無法復原！`)) {
    return;
  }

  deleteAllBtn.disabled = true;
  deleteAllBtn.textContent = '刪除中…';

  blogsRef
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        alert('目前沒有任何文章可以刪除');
        deleteAllBtn.disabled = false;
        deleteAllBtn.textContent = '刪除全部文章';
        return;
      }

      let batch = db.batch();
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      return batch.commit();
    })
    .then(() => {
      deleteAllBtn.disabled = false;
      deleteAllBtn.textContent = '刪除全部文章';
      alert('所有文章已成功刪除');
    })
    .catch((error) => {
      console.error('刪除全部文章時發生錯誤:', error);
      alert('刪除全部文章時發生錯誤：' + error.message);
      deleteAllBtn.disabled = false;
      deleteAllBtn.textContent = '刪除全部文章';
    });
}

blogListContainer.addEventListener('click', function (e) {
  const deleteBtn = e.target.closest('.delete-blog-btn');
  if (!deleteBtn) return;
  const blogId = deleteBtn.dataset.blogId;
  if (blogId) deleteBlog(blogId);
});

deleteAllBtn.addEventListener('click', function () {
  deleteAllBlogs();
});

uploadBtn.addEventListener('click', function () {
  try {
    loadingIndicator.classList.remove('is-hidden', 'hidden');
    uploadBtn.disabled = true;
    uploadStatus.innerHTML = '';
    uploadBlogs(blogsData);
  } catch (error) {
    loadingIndicator.classList.add('is-hidden', 'hidden');
    uploadBtn.disabled = false;
    showUploadStatus('error', `上傳時發生錯誤：${error.message}`);
  }
});

function uploadBlogs(blogs) {
  let batch = db.batch();

  blogs.forEach((blog) => {
    const blogData = {
      ...blog,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    batch.set(blogsRef.doc(), blogData);
  });

  batch.commit()
    .then(() => {
      loadingIndicator.classList.add('is-hidden', 'hidden');
      uploadBtn.disabled = false;
      showUploadStatus('success', `成功上傳 ${blogs.length} 篇文章到 Firestore！`);
    })
    .catch((error) => {
      loadingIndicator.classList.add('is-hidden', 'hidden');
      uploadBtn.disabled = false;
      showUploadStatus('error', `上傳時發生錯誤：${error.message}`);
    });
}

setupBlogListListener();
