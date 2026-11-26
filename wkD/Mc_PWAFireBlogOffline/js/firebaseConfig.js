/**
 * Firebase 設定模組（js/firebaseConfig.js）— Mc 離線快取版
 * 採用 Firebase v13 Modular persistentLocalCache，讓曾同步過的 Firestore 文件可於離線回顯。
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAwIZ1CqRVFCBLvQhUwfgPSKVKTIm6_ZM',
  authDomain: 'f2e2026.firebaseapp.com',
  projectId: 'f2e2026',
  storageBucket: 'f2e2026.firebasestorage.app',
  messagingSenderId: '624797846869',
  appId: '1:624797846869:web:c969830f0f4ddd37eeb3dc',
};

export const app = initializeApp(firebaseConfig);

let firestoreInstance;
try {
  // 為何開 persistentLocalCache：SW 管殼與靜態檔；曾同步過的 Firestore 文件靠本地快取離線回顯
  firestoreInstance = initializeFirestore(app, {
    localCache: persistentLocalCache(),
  });
} catch (err) {
  console.warn('Firestore persistentLocalCache 啟用失敗，改用預設記憶體快取:', err);
  firestoreInstance = getFirestore(app);
}

export const db = firestoreInstance;
export const auth = getAuth(app);
