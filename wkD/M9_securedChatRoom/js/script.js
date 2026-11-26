// index.html、signup.html、firechat.html 共用此模組，元素不一定存在，使用前要先檢查
import { auth, db } from './firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const chatroomDocRef = doc(db, 'chatrooms', 'chatroom1');
const messagesRef = collection(db, 'chatrooms', 'chatroom1', 'messages');
const messagesQuery = query(messagesRef, orderBy('timeStamp', 'asc'));

let profileName = '';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');
const cardHeader = document.querySelector('#card-header');
const messageField = document.querySelector('#message-field');
const messageList = document.querySelector('#message-list');
const userName = document.querySelector('#user-name');
const userPhoto = document.querySelector('#user-photo');
const userNameField = document.querySelector('#userName');
const photoURLField = document.querySelector('#photoURL');
if (signInfo) signInfo.textContent = '';

if (btnSignIn) {
  btnSignIn.addEventListener('click', async () => {
    btnSignIn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      btnSignIn.textContent = 'Sign In';
      window.location.href = './firechat.html';
    } catch (error) {
      btnSignIn.textContent = 'Sign In';
      console.error(error.message);
      if (signInfo) signInfo.textContent = error.message;
    }
  });
}

if (btnSignUp) {
  btnSignUp.addEventListener('click', async () => {
    btnSignUp.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.value, password.value);
      profileName = userNameField.value;
      await updateProfile(credential.user, {
        displayName: profileName,
        photoURL: photoURLField.value,
      });
      btnSignUp.textContent = 'Sign Up';
      email.value = '';
      password.value = '';
      userNameField.value = '';
      photoURLField.value = '';
      window.location.href = './firechat.html';
    } catch (error) {
      btnSignUp.textContent = 'Sign Up';
      console.error(error.message);
      if (signInfo) signInfo.textContent = error.message;
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (signInfo) signInfo.textContent = `${user.email} is login...`;
    user.providerData.forEach((profile) => {
      profileName = profile.displayName ?? '';
      if (userName) userName.textContent = profileName;
      if (userPhoto && profile.photoURL) {
        userPhoto.src = profile.photoURL;
      }
    });
  } else {
    console.log('not logged in');
  }
});

if (btnSignOut) {
  btnSignOut.addEventListener('click', async () => {
    try {
      await signOut(auth);
      if (email) email.value = '';
      if (password) password.value = '';
      if (signInfo) signInfo.textContent = 'No one login...';
      window.location.href = './index.html';
    } catch (error) {
      console.error(error.message);
    }
  });
}

if (messageField) {
  messageField.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    const message = messageField.value.trim();
    if (!message) return;

    messageField.value = '';
    addDoc(messagesRef, {
      senderName: profileName || 'anonymous',
      message,
      timeStamp: Date.now(),
    });
  });
}

if (messageList) {
  onSnapshot(messagesQuery, (querySnapshot) => {
    let html = '';
    querySnapshot.forEach((item) => {
      const data = item.data();
      const senderName = data.senderName || 'anonymous';
      const message = data.message ?? '';

      html += `<li class="message-item"><strong class="chat-username">${senderName}:</strong> ${message}</li>`;
    });
    messageList.innerHTML = html;
    messageList.scrollTop = messageList.scrollHeight;
  });
}

// 放在監聽器註冊之後，避免 top-level await 阻塞訊息輸入與即時監聽
if (cardHeader) {
  const snapshot = await getDoc(chatroomDocRef);
  if (snapshot.exists() && snapshot.data().name) {
    cardHeader.innerHTML = snapshot.data().name;
  }
}
