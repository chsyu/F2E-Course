// index.html、signup.html、profile.html 共用此模組，元素不一定存在，使用前要先檢查
import { auth } from './firebaseConfig.js';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');
const userName = document.querySelector('#userName');
const photoURL = document.querySelector('#photoURL');
const avatarImage = document.querySelector('.avatar-image');
const avatarName = document.querySelector('.avatar-name');
const avatarEmail = document.querySelector('.avatar-email');
if (signInfo) signInfo.textContent = '';

if (btnSignIn) {
  btnSignIn.addEventListener('click', async () => {
    btnSignIn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      btnSignIn.textContent = 'Sign In';
      window.location.href = './profile.html';
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
      await updateProfile(credential.user, {
        displayName: userName.value,
        photoURL: photoURL.value,
      });
      btnSignUp.textContent = 'Sign Up';
      email.value = '';
      password.value = '';
      userName.value = '';
      photoURL.value = '';
      window.location.href = './profile.html';
    } catch (error) {
      btnSignUp.textContent = 'Sign Up';
      if (signInfo) signInfo.textContent = error.message;
    }
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (signInfo) signInfo.textContent = `${user.email} is login...`;
    user.providerData.forEach((profile) => {
      if (avatarName) avatarName.textContent = profile.displayName ?? '';
      if (avatarEmail) avatarEmail.textContent = profile.email ?? '';
      if (avatarImage && profile.photoURL) {
        avatarImage.src = profile.photoURL;
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
