$(document).ready(function () {

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
    authDomain: "f2e2021-44d38.firebaseapp.com",
    projectId: "f2e2021-44d38",
    storageBucket: "f2e2021-44d38.appspot.com",
    messagingSenderId: "657878254604",
    appId: "1:657878254604:web:50f895d5225f3006c81a29",
  });
  // REFERENCE TO FIREBASE AUTH
  const auth = firebase.auth();

  // STORE PROFILE INFO
  let profile_Name, 
      profile_photoURL;

  // REGISTER DOM ELEMENTS
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $signInfo = $('#sign-info');
  const avatarImage = $('.avatar-image');
  const avatarName = $('.avatar-name');
  const avatarEmail = $('.avatar-email');
  $signInfo.html("");

  // SignIn
  $btnSignIn.click(function (e) {
    $btnSignIn.html(`<span class="spinner-border spinner-border-sm"></span>`);
    auth.signInWithEmailAndPassword($email.val(), $password.val())
      .then(function (e) {
        $btnSignIn.html(`Sign In`);
        window.location.href = "./profile.html";
      })
      .catch(function (e) {
        $btnSignIn.html(`Sign In`);
        console.log(e.message);
        $signInfo.html(e.message);
      });
  });

  // SignUp
  $btnSignUp.click(function (e) {
    console.log('sign up now ...');
    $btnSignUp.html(`<span class="spinner-border spinner-border-sm"></span>`);
    auth.createUserWithEmailAndPassword($email.val(), $password.val())
      .then(function () {
        const user = auth.currentUser;
        user.updateProfile({
          displayName: $('#userName').val(),
          photoURL: $('#photoURL').val()
        })
        .then(function () {
          $btnSignUp.html(`Sign Up`);
          $email.val('');
          $password.val('');
          $('#userName').val('');
          $('#photoURL').val('');
          window.location.href = "./profile.html";
        });
      })
      .catch(function (e) {
        $btnSignUp.html(`Sign Up`);
        $signInfo.html(e.message);
      });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      $signInfo.html(`${user.email} is login...`);
      user.providerData.forEach(function (profile) {
        console.log(`  Sign-in provider: ${profile.providerId}`);
        console.log(`  Provider-specific UID: ${profile.uid}`);
        console.log(`  Name: ${profile.displayName}`);
        console.log(`  Email: ${profile.email}`);
        console.log(`  Photo URL: ${profile.photoURL}`);
        profile_Name = profile.displayName;
        profile_photoURL = profile.email;
        avatarName.html(profile.displayName);
        avatarEmail.html(profile.email);
        avatarImage.attr("src", profile.photoURL);
      });
    } else {
      console.log("not logged in");
    }
  });


  // Signout
  $btnSignOut.click(function () {
    auth.signOut();
    $email.val('');
    $password.val('');
    $signInfo.html('No one login...');
    window.location.href = "./index.html";
  });
});
