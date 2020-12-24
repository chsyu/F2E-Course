$(document).ready(function(){

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyDUH6vOCALEXSjYHgv8P9d2y3tKklE44qA",
    authDomain: "f2e2020-bd468.firebaseapp.com",
    databaseURL: "https://f2e2020-bd468.firebaseio.com",
    projectId: "f2e2020-bd468",
    storageBucket: "f2e2020-bd468.appspot.com",
    messagingSenderId: "832044128799",
    appId: "1:832044128799:web:5dedad46efcd2c3253932a",
    measurementId: "G-QWW610MX3Z"
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