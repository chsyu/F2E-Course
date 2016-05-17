// CREATE A REFERENCE TO FIREBASE
var messagesRef = new Firebase('https://chsyuf2e.firebaseio.com/chat-demo');

// REGISTER DOM ELEMENTS
var $messageField = $('#messageInput');
var $nameField = $('#nameInput');
var $messageList = $('#example-messages');

var ref = new Firebase('https://chsyuf2e.firebaseio.com');

// ref.createUser({
//   email    : "bobtony@firebase.com",
//   password : "correcthorsebatterystaple"
// }, function(error, userData) {
//   if (error) {
//     console.log("Error creating user:", error);
//   } else {
//     console.log("Successfully created user account with uid:", userData.uid);
//   }
// });


ref.authWithPassword({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData.uid);
  }
});


// LISTEN FOR KEYPRESS EVENT
$messageField.keypress(function (e) {
  if (e.keyCode == 13) {
    //FIELD VALUES
    var username = $nameField.val();
    var message = $messageField.val();

    //SAVE DATA TO FIREBASE AND EMPTY FIELD
    messagesRef.push({name:username, text:message});
    $messageField.val('');
  }
});

// Add a callback that is triggered for each chat message.
messagesRef.limitToLast(10).on('child_added', function (snapshot) {
  //GET DATA
  var data = snapshot.val();
  var username = data.name || "anonymous";
  var message = data.text;

  //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
  var $messageElement = $("<li>");
  var $nameElement = $("<strong class='example-chat-username'></strong>");
  $nameElement.text(username);
  $messageElement.text(message).prepend($nameElement);

  //ADD MESSAGE
  $messageList.append($messageElement)

  //SCROLL TO BOTTOM OF MESSAGE LIST
  $messageList[0].scrollTop = $messageList[0].scrollHeight;
});
