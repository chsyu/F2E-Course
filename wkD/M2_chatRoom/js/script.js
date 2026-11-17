// INITIALIZE FIREBASE
firebase.initializeApp({
  apiKey: "AIzaSyAwIZ1CqRVFCBLvQhUwfgPSKVKTIm6_ZM",
  authDomain: "f2e2026.firebaseapp.com",
  projectId: "f2e2026",
  storageBucket: "f2e2026.firebasestorage.app",
  messagingSenderId: "624797846869",
  appId: "1:624797846869:web:c969830f0f4ddd37eeb3dc",
});

// REFERENCE CHATROOM DOCUMENT
let chatroomDocRef = firebase.firestore()
  .collection("chatrooms")
  .doc("chatroom1");    
// REFERENCE CHATROOM MESSAGES
let messagesCollectionRef 
  = chatroomDocRef.collection("messages");
// QUERY MESSAGES BY TIMESTAMP ORDERING
let queryMessagesCollectionRef 
  = messagesCollectionRef.orderBy("timeStamp", "asc");

// REGISTER DOM ELEMENTS
const messageField = document.querySelector('#message-field');
const nameField = document.querySelector('#name-field');
const messageList = document.querySelector('#message-list');

// LISTEN FOR KEYPRESS EVENT
messageField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    //FIELD VALUES
    let senderName = nameField.value;
    let message = messageField.value;

    //SAVE DATA TO FIREBASE
    messagesCollectionRef.add({
      senderName: senderName,
      message: message,
      timeStamp: Date.now(),
    });

    // EMPTY INPUT FIELD
    messageField.value = '';
  }
});

// A RENDER SCREEN CALLBACK THAT IS TRIGGERED FOR EACH CHAT MESSAGE
queryMessagesCollectionRef.onSnapshot(function (querySnapshot) {
  messageList.innerHTML = "";
  //MONITOR CHAT MESSAGE AND RENDER SCREEN
  // 為何用 createElement + textContent：訊息來自使用者／Firestore，不可當 HTML 插入以免 XSS
  querySnapshot.forEach(function (doc) {
    const senderName = doc.data().senderName || "anonymous";
    const message = doc.data().message;

    const messageElement = document.createElement("li");
    messageElement.className = "message-item";

    const nameElement = document.createElement("strong");
    nameElement.className = "chat-username";
    nameElement.textContent = `${senderName}:`;

    messageElement.append(nameElement, document.createTextNode(` ${message ?? ""}`));
    messageList.append(messageElement);
  });
  //SCROLL TO BOTTOM OF MESSAGE LIST
  messageList.scrollTop = messageList.scrollHeight;
});
