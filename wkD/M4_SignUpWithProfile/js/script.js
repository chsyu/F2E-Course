$(document).ready(function () {

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

  // Reference chatroom document
  let docRef = firebase.firestore()
    .collection("chatrooms")
    .doc("chatroom1");
  // Reference chatroom messages
  let messagesRef = docRef.collection("messages");

  // Reference chatroom messages query
  let queryRef = messagesRef
    .orderBy("timeStamp", "asc");

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
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    auth.signInWithEmailAndPassword(email, pass)
      .then(function (e) {
        window.location.href = "./profile.html";
      })
      .catch(function (e) {
        console.log(e.message);
        $signInfo.html(e.message);
      });
  });

  // SignUp
  $btnSignUp.click(function (e) {
    console.log('sign up now ...');
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    auth.createUserWithEmailAndPassword(email, pass)
      .then(function () {
        const user = firebase.auth().currentUser;
        const $userName = $('#userName').val();
        const $photoURL = $('#photoURL').val();
        console.log(user);

        user.updateProfile({
          displayName: $userName,
          photoURL: $photoURL
        })
          .then(function () {
            $email.val('');
            $password.val('');
            $('#userName').val('');
            $('#photoURL').val('');
            console.log("Update successful.");
            window.location.href = "./profile.html";
          });
      })
      .catch(function (e) {
        console.log(e.message);
        $signInfo.html(e.message);
      });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user);
      $signInfo.html(user.email + " is login...");
      user.providerData.forEach(function (profile) {
        console.log("  Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
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
    firebase.auth().signOut();
    $email.val('');
    $password.val('');
    $signInfo.html('No one login...');
    window.location.href = "./index.html";
  });
});
