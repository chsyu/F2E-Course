$(document).ready(function () {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
    authDomain: "f2e2018-10e3d.firebaseapp.com",
    databaseURL: "https://f2e2018-10e3d.firebaseio.com",
    projectId: "f2e2018-10e3d",
    storageBucket: "f2e2018-10e3d.appspot.com",
    messagingSenderId: "315995849194",
    appId: "1:315995849194:web:5103d9e1d0bc2da0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var dbRef = firebase.database().ref().child('object');
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $btnSubmit = $('#btnSubmit');
  const $signInfo = $('#sign-info');
  const $fileName = $('.file__name');
  const $file = $('#file');
  const $btnLogout = $('#btnLogout');
  const avatarImage = $('.avatar-image');
  const avatarName = $('.avatar-name');
  const avatarEmail = $('.avatar-email');
  let photoURL;
  $signInfo.html("");


var storageRef = firebase.storage().ref();

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  console.log(evt);
  var file = evt.target.files[0];
  $fileName.html(file.name);
  var metadata = {
    'contentType': file.type
  };
  
  storageRef.child('images/' + file.name).put(file, metadata)
    .then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
    })
    .then(function(downloadURL) {
      photoURL = downloadURL
      console.log(`Successfully uploaded file and got download link - ${photoURL}`);
    })
    .catch(function(error) {
      // Use to signal error if something goes wrong.
      console.log(`Failed to upload file and get link - ${error}`);
    });
}

window.onload = function () {
  $file.change(handleFileSelect);
  // $file.disabled = false;
}

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
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    auth.createUserWithEmailAndPassword(email, pass)
    .catch(function (e) {
      $signInfo.html(e.message);
    })
    .then(function (e) {
      window.location.href = "./detail.html";
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

  // SignOut
  $btnSignOut.click(function () {
    firebase.auth().signOut();
    $signInfo.html('No one login...');
  });

  // Submit
  $btnSubmit.click(function () {
    const user = firebase.auth().currentUser;
    const $userName = $('#userName').val();
    // const $photoURL = $('#photoURL').val();
    console.log(user);

    user.updateProfile({
      displayName: $userName,
      photoURL: photoURL
    })
    .then(function () {
      console.log("Update successful.");
      window.location.href = "./profile.html";
    });
  });

  //Logout
  $btnLogout.click(function () {
    firebase.auth().signOut();
    console.log("Logout.");
    window.location.href = "./index.html";
  });

});