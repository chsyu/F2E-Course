/**
 * Firebase 設定檔
 * 集中管理 Firebase 初始化設定，避免程式碼重複
 */

// Firebase 設定物件
const firebaseConfig = {
  apiKey: "AIzaSyAwIZ1CqRVFCBLvQhUwfgPSKVKTIm6_ZM",
  authDomain: "f2e2026.firebaseapp.com",
  projectId: "f2e2026",
  storageBucket: "f2e2026.firebasestorage.app",
  messagingSenderId: "624797846869",
  appId: "1:624797846869:web:c969830f0f4ddd37eeb3dc",
};

// 初始化 Firebase（如果尚未初始化）
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 匯出 Firestore 資料庫參照（方便其他檔案使用）
const db = firebase.firestore();

// 為何開 persistence：SW 管殼與靜態檔；曾同步過的 Firestore 文件靠本地快取離線回顯
db.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("Firestore persistence 無法啟用：可能有多個分頁同時開啟");
  } else if (err.code === "unimplemented") {
    console.warn("此瀏覽器不支援 Firestore persistence");
  } else {
    console.warn("Firestore persistence 啟用失敗:", err);
  }
});

