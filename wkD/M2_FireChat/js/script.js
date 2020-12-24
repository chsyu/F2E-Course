$(document).ready(function () {

  // INITIALIZE FIREBASE
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

  // REFERENCE CHATROOM DOCUMENT
  let docRef = firebase.firestore()
    .collection("chatrooms")
    .doc("chatroom2");
  // REFERENCE CHATROOM MESSAGES
  let messagesRef = docRef
    .collection("messages");

  // QUERY MESSAGES BY TIMESTAMP ORDERING
  let queryRef = messagesRef
    .orderBy("timeStamp", "asc");

  // REGISTER DOM ELEMENTS
  const $cardHeader = $('#card-header');
  const $messageField = $('#message-field');
  const $nameField = $('#name-field');
  const $messageList = $('#message-list');

  // SET CHAT ROOM TITLE
  docRef.get().then(function (doc) {
    $cardHeader.html(doc.data().name);
  });

  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      let senderName = $nameField.val();
      let message = $messageField.val();

      //SAVE DATA TO FIREBASE
      messagesRef.add({
        "senderName": senderName, 
        "message": message,
        "timeStamp": Date.now()
        });

      // EMPTY INPUT FIELD
      $messageField.val('');
    }
  });

  // A RENDER SCREEN CALLBACK THAT IS TRIGGERED FOR EACH CHAT MESSAGE
  queryRef.onSnapshot(function (querySnapshot) {
    console.log(querySnapshot)
    $messageList.html('');
    //MONITOR CHAT MESSAGE AND RENDER SCREEN
    querySnapshot.forEach(function(doc) {
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

    //SCROLL TO BOTTOM OF MESSAGE LIST
    $messageList[0].scrollTop = $messageList[0].scrollHeight;
  });
});
