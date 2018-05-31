$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
    authDomain: "f2e2018-10e3d.firebaseapp.com",
    databaseURL: "https://f2e2018-10e3d.firebaseio.com",
    projectId: "f2e2018-10e3d",
    storageBucket: "f2e2018-10e3d.appspot.com",
    messagingSenderId: "315995849194"
  };
  firebase.initializeApp(config);

  // Firebase database reference
  var dbChatRoom = firebase.database().ref().child('chatroom');
  var dbUser = firebase.database().ref().child('users');

  var photoURL;
  var $img = $('img');

  // REGISTER DOM ELEMENTS
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $hovershadow = $('.hover-shadow');
  const $btnSubmit = $('#btnSubmit');
  const $signInfo = $('#sign-info');
  const $file = $('#file');
  const $profileName = $('#profile-name');
  const $profileEmail = $('#profile-email');
  const $profileUserIntro = $('#profile-userIntro');

  // Hovershadow
  $hovershadow.hover(
    function () {
      $(this).addClass("mdl-shadow--4dp");
    },
    function () {
      $(this).removeClass("mdl-shadow--4dp");
    }
  );

  var storageRef = firebase.storage().ref();

  function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];

    var metadata = {
      'contentType': file.type
    };

    // Push to child path.
    // [START oncomplete]
    storageRef.child('images/' + file.name).put(file, metadata).then(function (snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log(snapshot.metadata);
      photoURL = snapshot.metadata.downloadURLs[0];
      console.log('File available at', photoURL);
    }).catch(function (error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
    // [END oncomplete]
  }

  window.onload = function () {
    $file.change(handleFileSelect);
    // $file.disabled = false;
  }

  // SignIn/SignUp/SignOut Button status
  var user = firebase.auth().currentUser;
  if (user) {
    $btnSignIn.attr('disabled', 'disabled');
    $btnSignUp.attr('disabled', 'disabled');
    $btnSignOut.removeAttr('disabled')
  } else {
    $btnSignOut.attr('disabled', 'disabled');
    $btnSignIn.removeAttr('disabled')
    $btnSignUp.removeAttr('disabled')
  }

  // Sign In
  $btnSignIn.click(function (e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function (e) {
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function () {
      console.log('SignIn User');
    });
  });

  // SignUp
  $btnSignUp.click(function (e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function (e) {
      console.log(e.message);
      $signInfo.html(e.message);
    });
    promise.then(function (user) {
      console.log("SignUp user is " + user.email);
      const dbUserid = dbUser.child(user.uid);
      dbUserid.push({ email: user.email });
    });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      const loginName = user.displayName || user.email;
      $signInfo.html(loginName + " is login...");
      $btnSignIn.attr('disabled', 'disabled');
      $btnSignUp.attr('disabled', 'disabled');
      $btnSignOut.removeAttr('disabled')
      showLoginInfo();
    } else {
      console.log("not logged in");
      $profileName.html("N/A");
      $profileEmail.html('N/A');
      $img.attr("src", "");
    }
  });

  // SignOut
  $btnSignOut.click(function () {
    firebase.auth().signOut();
    console.log('LogOut');
    $signInfo.html('No one login...');
    $btnSignOut.attr('disabled', 'disabled');
    $btnSignIn.removeAttr('disabled')
    $btnSignUp.removeAttr('disabled')
  });

  // Submit
  $btnSubmit.click(function () {
    const user = firebase.auth().currentUser;
    const $userName = $('#userName').val();
    const $userIntro = $('#userIntro').val();
    console.log($userIntro);
    let dbUserid = dbUser.child(user.uid);
    dbUserid.set({
      email: user.email,
      name: $userName,
      intro: $userIntro,
      photoURL: photoURL
    });

    showLoginInfo();

    promise = user.updateProfile({
      displayName: $userName,
      photoURL: photoURL
    });
    promise.then(function () {
      console.log("Profile Update successful.");
    });
  });

  function showLoginInfo() {
    const dbUserid = firebase.auth().currentUser.uid;
    const user = firebase.auth().currentUser;
    firebase.database().ref('/users/' + dbUserid).once('value')
      .then(function(snapshot) {
        console.log("User private Info Update successful.");
        let username = snapshot.val().name || 'Anonymous';
        let email = snapshot.val().email || 'Anonymous';
        let Intro = snapshot.val().intro || 'Anonymous';
        let photoURL = snapshot.val().photoURL || 'Anonymous';
        $profileName.html(username);
        $profileEmail.html(email);
        $profileUserIntro.html(Intro)
        $img.attr("src", photoURL);
        const loginName = user.displayName || user.email;
        $signInfo.html(loginName + " is login...");
      });
  }

});
