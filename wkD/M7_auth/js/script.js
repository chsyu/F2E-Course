// Firebase 已在 firebaseConfig.js 中初始化
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
    signInfo.textContent = e.message;
  });
});

// SignUp
btnSignUp.addEventListener('click', function(e){
  auth.createUserWithEmailAndPassword(email.value, password.value)
  .catch(function(e){
    signInfo.textContent = e.message;
  });
});

// Listening Login User
auth.onAuthStateChanged(function(user){
  if(user) {
    signInfo.textContent = `${user.email} is login...`;
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
  signInfo.textContent = 'No one login...';
});
