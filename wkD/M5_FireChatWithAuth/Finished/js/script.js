$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAb7v8YBRxBpk4P93XS-dzLAy_U5iv_0SU",
    authDomain: "authchat-e1f98.firebaseapp.com",
    databaseURL: "https://authchat-e1f98.firebaseio.com",
    storageBucket: "authchat-e1f98.appspot.com",
    messagingSenderId: "120716218610"
  };
  firebase.initializeApp(config);

  var dbRef = firebase.database().ref();
  // REGISTER DOM ELEMENTS
  const $messageField = $('#messageInput');
  const $nameField = $('#nameInput');
  const $messageList = $('#example-messages');
  const $email = $('#email');
  const $password = $('#password');
  const $btnSignIn = $('#btnSignIn');
  const $btnSignOut = $('#btnSignOut');
  const $message = $('#example-messages');
  var user = firebase.auth().currentUser;
  if (user) {
    $btnSignIn.attr('disabled', 'disabled');
    $btnSignOut.removeAttr('disabled')
  } else {
    $btnSignOut.attr('disabled', 'disabled');
    $btnSignIn.removeAttr('disabled')
  }


  // Sign In
  // SignIn
  $btnSignIn.click(function(e){
    const email = $email.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
    });
    promise.then(function(){
      console.log('Login');
      $btnSignIn.attr('disabled', 'disabled');
      $btnSignOut.removeAttr('disabled')

      // Add a callback that is triggered for each chat message.
      dbRef.limitToLast(10).on('child_added', function (snapshot) {
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

    });
  });

  // SignOut
  $btnSignOut.click(function(){
    firebase.auth().signOut();
    console.log('LogOut');
    $btnSignOut.attr('disabled', 'disabled');
    $btnSignIn.removeAttr('disabled')
    $message.html('');
  });

  // LISTEN FOR KEYPRESS EVENT
  $messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = $nameField.val();
      var message = $messageField.val();
      console.log(username);
      console.log(message);

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      dbRef.push({name:username, text:message});
      $messageField.val('');
    }
  });

});
