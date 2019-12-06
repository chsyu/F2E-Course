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

  // Store Profile Info
  let profile_Name, profile_Url;

  // REGISTER DOM ELEMENTS
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignUp = $('#btnSignUp');
  const $btnSignOut = $('#btnSignOut');
  const $signInfo = $('#sign-info');
  const $cardHeader = $('#card-header');
  const $messageField = $('#message-field');
  const $messageList = $('#message-list');
  const $userName = $('#user-name');
  const $userPhoto = $('#user-photo');
  $signInfo.html("");

  // SignIn
  $btnSignIn.click(function (e) {
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    auth.signInWithEmailAndPassword(email, pass)
      .then(function (e) {
        window.location.href = "./firechat.html";
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
        user = firebase.auth().currentUser;
        $userName = $('#userName').val();
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
            window.location.href = "./firechat.html";
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
        profile_Name = profile.displayName;
        profile_Url = profile.photoURL;
        $userName.html(profile_Name);
        $userPhoto.attr("src", profile_Url);
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

  // SET CHAT ROOM TITLE
  docRef.get().then(function (doc) {
    $cardHeader.html(doc.data().name);
  });

  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      let message = $messageField.val();

      //SAVE DATA TO FIREBASE
      messagesRef.add({
        "senderName": profile_Name,
        "message": message,
        "timeStamp": Date.now()
      });

      // EMPTY INPUT FIELD
      $messageField.val('');
    }
  });

  // A RENDER SCREEN CALLBACK THAT IS TRIGGERED FOR EACH CHAT MESSAGE
  queryRef.onSnapshot(function (querySnapshot) {
    $messageList.html('');
    //MONITOR CHAT MESSAGE AND RENDER SCREEN
    querySnapshot.forEach(function (doc) {
      let senderName = doc.data().senderName || "anonymous";
      let message = doc.data().message;
      let messageItem = `
        <li class="message-item">
          <strong class="chat-username">${senderName}:</strong>
          ${message}
        </li>
        `;
      $messageList.append(messageItem);
    });
    if ($messageList[0]) {
      //SCROLL TO BOTTOM OF MESSAGE LIST
      $messageList[0].scrollTop = $messageList[0].scrollHeight;

    }
  });
});
