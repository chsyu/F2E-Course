/**
 * Firebase 設定檔
 * 集中管理 Firebase 初始化設定，避免程式碼重複
 */

// Firebase 設定物件
const firebaseConfig = {
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29",
};

// 初始化 Firebase（如果尚未初始化）
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 匯出 Firestore 資料庫參照（方便其他檔案使用）
const db = firebase.firestore();

