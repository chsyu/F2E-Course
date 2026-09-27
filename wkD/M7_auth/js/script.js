// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29",
});
// Reference Firebase Auth
const auth = firebase.auth();

// REGISTER DOM ELEMENTS
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');

// SignIn
btnSignIn.addEventListener('click', function(e){
  auth.signInWithEmailAndPassword(email.value, password.value)
  .catch(function(e){
    signInfo.innerHTML = e.message;
  });
});

// SignUp
btnSignUp.addEventListener('click', function(e){
  auth.createUserWithEmailAndPassword(email.value, password.value)
  .catch(function(e){
    signInfo.innerHTML = e.message;
  });
});

// Listening Login User
auth.onAuthStateChanged(function(user){
  if(user) {
    signInfo.innerHTML = `${user.email} is login...`;
    console.log(user);
  } else {
    console.log("not logged in");
  }
});

// Signout
btnSignOut.addEventListener('click', function(){
  auth.signOut();
  email.value = '';
  password.value = '';
  signInfo.innerHTML = 'No one login...';
});
