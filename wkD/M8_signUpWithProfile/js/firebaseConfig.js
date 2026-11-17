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
