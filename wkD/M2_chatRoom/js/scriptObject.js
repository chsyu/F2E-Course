$(function(){

   let App = {
      init: function() {
         this.firebaseConfig = {
           apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
           authDomain: "f2e2021-44d38.firebaseapp.com",
           projectId: "f2e2021-44d38",
           storageBucket: "f2e2021-44d38.appspot.com",
           messagingSenderId: "657878254604",
           appId: "1:657878254604:web:50f895d5225f3006c81a29",
         };
         // Initialize Firebase
         firebase.initializeApp(this.firebaseConfig);
         this.dbRef = firebase.database().ref();
         // REGISTER DOM ELEMENTS
         this.$messageField = $('#messageInput');
         this.$nameField = $('#nameInput');
         this.$messageList = $('#example-messages');
         // BIND THIS
         this.onSaveMessage = this.onSaveMessage.bind(this);
         this.onShowMessage = this.onShowMessage.bind(this);
         // BIND EVENT
         this.bindEvent();
      },
      bindEvent: function() {
         this.$messageField.keypress(this.onSaveMessage);
         this.dbRef.limitToLast(10).on(
            'child_added',
            this.onShowMessage
         );
      },
      onSaveMessage: function(e) {
         console.log(this.dbRef);
         console.log(this.$nameField);
         console.log(this.$nameField.val());
         if (e.keyCode == 13) {
            //FIELD VALUES
            let username = this.$nameField.val();
            let message = this.$messageField.val();
            console.log(username);
            console.log(message);

            //SAVE DATA TO FIREBASE AND EMPTY FIELD
            this.dbRef.push({name:username, text:message});
            this.$messageField.val('');
         }
      },
      onShowMessage: function(snapshot) {
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
         this.$messageList.append($messageElement)

         //SCROLL TO BOTTOM OF MESSAGE LIST
         this.$messageList[0].scrollTop = this.$messageList[0].scrollHeight;
      }
   };
   
   App.init();
});

