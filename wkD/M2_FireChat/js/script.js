$(document).ready(function(){
  // Your web app's Firebase configuration
  let firebaseConfig = {
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
  let dbRef = firebase.database().ref();
  // REGISTER DOM ELEMENTS
  let $messageField = $('#messageInput');
  let $nameField = $('#nameInput');
  let $messageList = $('#example-messages');
  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      let username = $nameField.val();
      let message = $messageField.val();
      console.log(username);
      console.log(message);

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      dbRef.push({name:username, text:message});
      $messageField.val('');
    }
  });

  // Add a callback that is triggered for each chat message.
  dbRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    let data = snapshot.val();
    let username = data.name || "anonymous";
    let message = data.text;
    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    let $messageElement = $("<li>");
    let $nameElement = $("<strong class='example-chat-username'></strong>");
    $nameElement.text(username);
    $messageElement.text(message).prepend($nameElement);
    //ADD MESSAGE
    $messageList.append($messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    $messageList[0].scrollTop = $messageList[0].scrollHeight;
  });
});
