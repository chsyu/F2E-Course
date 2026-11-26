/**
 * M1_helloFirebase（ESM 對照版）Firebase 設定模組
 * 使用 Firebase v13.4.0 Modular SDK，匯出 app 與 db。
 */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

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
