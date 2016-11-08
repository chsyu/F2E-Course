$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBtoaYezSH95rXzmJVJfbhf37x5suG31O8",
    authDomain: "fireauth-77fc4.firebaseapp.com",
    databaseURL: "https://fireauth-77fc4.firebaseio.com",
    storageBucket: "fireauth-77fc4.appspot.com",
    messagingSenderId: "435132036653"
  };
  firebase.initializeApp(config);
  var dbRef = firebase.database().ref().child('object');
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');

  // SignIn
  $btnSignIn.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
    });
  });

  // SignUp
  $btnSignUp.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
    });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
    } else {
      console.log("not logged in");
    }
  });

  // Logout
  $btnSignOut.click(function(){
    firebase.auth().signOut();
  });
});
