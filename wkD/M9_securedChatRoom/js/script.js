// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29",
});

// Reference chatroom document
const docRef = firebase.firestore()
  .collection("chatrooms")
  .doc("chatroom1");
// Reference chatroom messages
const messagesRef = docRef.collection("messages");

// Referenct authentifacation
const auth = firebase.auth();

// Reference chatroom messages query
const queryRef = messagesRef
  .orderBy("timeStamp", "asc");

// Store Profile Info
let profile_Name, 
    profile_photoURL;

// REGISTER DOM ELEMENTS
// index.html、signup.html、firechat.html 共用此檔案，元素不一定存在，使用前要先檢查
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');
const cardHeader = document.querySelector('#card-header');
const messageField = document.querySelector('#message-field');
const messageList = document.querySelector('#message-list');
const userName = document.querySelector('#user-name');
const userPhoto = document.querySelector('#user-photo');
const userNameField = document.querySelector('#userName');
const photoURLField = document.querySelector('#photoURL');
if (signInfo) signInfo.innerHTML = "";

// SignIn
if (btnSignIn) {
  btnSignIn.addEventListener('click', function (e) {
    btnSignIn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(function (e) {
        btnSignIn.innerHTML = `Sign In`;
        window.location.href = "./firechat.html";
      })
      .catch(function (e) {
        btnSignIn.innerHTML = `Sign In`;
        console.log(e.message);
        if (signInfo) signInfo.innerHTML = e.message;
      });
  });
}

// SignUp
if (btnSignUp) {
  btnSignUp.addEventListener('click', function (e) {
    console.log('sign up now ...');
    btnSignUp.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    auth.createUserWithEmailAndPassword(email.value, password.value)
      .then(function () {
        const user = auth.currentUser;
        profile_Name = userNameField.value;
        profile_photoURL = photoURLField.value;
        console.log(user);

        user.updateProfile({
          displayName: profile_Name,
          photoURL: profile_photoURL
        })
          .then(function () {
            btnSignUp.innerHTML = `Sign Up`;
            email.value = '';
            password.value = '';
            userNameField.value = '';
            photoURLField.value = '';
            console.log("Update successful.");
            window.location.href = "./firechat.html";
          });
      })
      .catch(function (e) {
        console.log(e.message);
        if (signInfo) signInfo.innerHTML = e.message;
      });
  });
}

// Listening Login User
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    if (signInfo) signInfo.innerHTML = `${user.email} is login...`;
    user.providerData.forEach(function (profile) {
      profile_Name = profile.displayName;
      if (userName) userName.innerHTML = profile.displayName;
      if (userPhoto) userPhoto.setAttribute("src", profile.photoURL);
    });
  } else {
    console.log("not logged in");
  }
});


// Signout
if (btnSignOut) {
  btnSignOut.addEventListener('click', function () {
    auth.signOut();
    if (email) email.value = '';
    if (password) password.value = '';
    if (signInfo) signInfo.innerHTML = 'No one login...';
    window.location.href = "./index.html";
  });
}

// SET CHAT ROOM TITLE
docRef.get().then(function (doc) {
  if (cardHeader) cardHeader.innerHTML = doc.data().name;
});

// LISTEN FOR KEYPRESS EVENT
if (messageField) {
  messageField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      //FIELD VALUES
      let message = messageField.value;

      //SAVE DATA TO FIREBASE
      messagesRef.add({
        "senderName": profile_Name,
        "message": message,
        "timeStamp": Date.now()
      });

      // EMPTY INPUT FIELD
      messageField.value = '';
    }
  });
}

// A RENDER SCREEN CALLBACK THAT IS TRIGGERED FOR EACH CHAT MESSAGE
queryRef.onSnapshot(function (querySnapshot) {
  if (!messageList) return;
  messageList.innerHTML = '';
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
    messageList.insertAdjacentHTML('beforeend', messageItem);
  });
  //SCROLL TO BOTTOM OF MESSAGE LIST
  messageList.scrollTop = messageList.scrollHeight;
});
