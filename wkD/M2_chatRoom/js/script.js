$(document).ready(function () {

  // INITIALIZE FIREBASE
  firebase.initializeApp({
    apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
    authDomain: "f2e2021-44d38.firebaseapp.com",
    projectId: "f2e2021-44d38",
    storageBucket: "f2e2021-44d38.appspot.com",
    messagingSenderId: "657878254604",
    appId: "1:657878254604:web:50f895d5225f3006c81a29",
  });

  // REFERENCE CHATROOM DOCUMENT
  let chatroomDocRef = firebase.firestore()
    .collection("chatrooms")
    .doc("chatroom1");    
  // REFERENCE CHATROOM MESSAGES
  let messagesCollectionRef 
    = chatroomDocRef.collection("messages");
  // QUERY MESSAGES BY TIMESTAMP ORDERING
  let queryMessagesCollectionRef 
    = messagesCollectionRef.orderBy("timeStamp", "asc");

  // REGISTER DOM ELEMENTS
  const $messageField = $('#message-field');
  const $nameField = $('#name-field');
  const $messageList = $('#message-list');

  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      let senderName = $nameField.val();
      let message = $messageField.val();

      //SAVE DATA TO FIREBASE
      messagesCollectionRef.add({
        senderName: senderName,
        message: message,
        timeStamp: Date.now(),
      });

      // EMPTY INPUT FIELD
      $messageField.val('');
    }
  });

  // A RENDER SCREEN CALLBACK THAT IS TRIGGERED FOR EACH CHAT MESSAGE
  queryMessagesCollectionRef.onSnapshot(function (querySnapshot) {
    $messageList.html("");
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
    //SCROLL TO BOTTOM OF MESSAGE LIST
    $messageList[0].scrollTop = $messageList[0].scrollHeight;
  });
});
