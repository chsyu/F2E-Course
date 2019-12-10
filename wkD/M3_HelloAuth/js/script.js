$(document).ready(function(){

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
    authDomain: "f2e2018-10e3d.firebaseapp.com",
    databaseURL: "https://f2e2018-10e3d.firebaseio.com",
    projectId: "f2e2018-10e3d",
    storageBucket: "f2e2018-10e3d.appspot.com",
    messagingSenderId: "315995849194",
    appId: "1:315995849194:web:5103d9e1d0bc2da0"
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