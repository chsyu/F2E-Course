/**
 * Firebase 設定模組（js/firebaseConfig.js）
 * 單一專案內各頁面透過 Import Map 共用此模組，集中管理 Firebase v13 Modular 初始化。
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
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
export const db = getFirestore(app);
export const auth = getAuth(app);
