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
  const $btnSubmit = $('#btnSubmit');

  // SignIn
  $btnSignIn.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
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
    promise.then(function(e){
      window.location.href = "./profile.html";
    });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.displayName);
        console.log("  Email: "+profile.email);
        console.log("  Photo URL: "+profile.photoURL);
      });
    } else {
      console.log("not logged in");
    }
  });

  // Logout
  $btnSignOut.click(function(){
    firebase.auth().signOut();
  });

  // Submit
  $btnSubmit.click(function(){
    const user = firebase.auth().currentUser;
    const $userName = $('#userName').val();
    const $photoURL = $('#photoURL').val();

    const promise = user.updateProfile({
      displayName: $userName,
      photoURL: $photoURL
    });
    promise.then(function() {
      console.log("Update successful.");
      window.location.href = "./index.html";
    });
  });
});
