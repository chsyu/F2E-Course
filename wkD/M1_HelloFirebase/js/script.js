// 對照 js/script.conventional.js（Compat）：改用 Modular SDK
import { db } from './firebaseConfig.js';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const title = document.querySelector('#title');
const docElement = document.querySelector('#doc');

const usersRef = collection(db, 'users');
// addDoc(usersRef, {
//   name: 'NTUE',
//   age: 13,
//   tel: {
//     tel1: '111-111',
//     tel2: '222-111',
//   },
// });

const snapshot_getDoc = await getDoc(docRef);
if (snapshot_getDoc.exists()) {
  docElement.innerHTML = `doc 1167 name = ${snapshot_getDoc.data().name}`;
}

const docRef = doc(db, 'users', '1167');

setDoc(docRef, {
  name: 'Alex2',
  age: 27,
  tel: {
    tel1: '111-111',
    tel2: '222-111',
  },
});

// 即時監聽文件變化
onSnapshot(docRef, (snapshot) => {
  const data = snapshot.data();
  docElement.innerHTML = `doc 1167 name = ${data.name}`;
  title.innerHTML = `user name = ${data.name}, user age = ${data.age}`;
});
