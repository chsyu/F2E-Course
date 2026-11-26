// 匯入本地 firebaseConfig.js 與 Firebase v13 Modular Auth
import { auth } from './firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');

btnSignIn.addEventListener('click', async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
  } catch (error) {
    signInfo.textContent = error.message;
  }
});

btnSignUp.addEventListener('click', async () => {
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
  } catch (error) {
    signInfo.textContent = error.message;
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    signInfo.textContent = `${user.email} is login...`;
    console.log(user);
  } else {
    console.log('not logged in');
  }
});

btnSignOut.addEventListener('click', async () => {
  try {
    await signOut(auth);
    email.value = '';
    password.value = '';
    signInfo.textContent = 'No one login...';
  } catch (error) {
    signInfo.textContent = error.message;
  }
});
