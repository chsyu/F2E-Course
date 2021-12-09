$(document).ready(function(){

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
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $signInfo = $('#sign-info');

  // SignIn
  $btnSignIn.click(function(e){
    auth.signInWithEmailAndPassword($email.val(), $password.val())
    .catch(function(e){
      $signInfo.html(e.message);
    });
  });

  // SignUp
  $btnSignUp.click(function(e){
    auth.createUserWithEmailAndPassword($email.val(), $password.val())
    .catch(function(e){
      $signInfo.html(e.message);
    });
  });

  // Listening Login User
  auth.onAuthStateChanged(function(user){
    if(user) {
      $signInfo.html(`${user.email} is login...`);
      console.log(user);
    } else {
      console.log("not logged in");
    }
  });

  // Signout
  $btnSignOut.click(function(){
    auth.signOut();
    $email.val('');
    $password.val('');
    $signInfo.html('No one login...');
  });
});
ß