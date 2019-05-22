$(function(){

   let App = {
      init: function() {
         this.firebaseConfig = {
            apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
            authDomain: "f2e2018-10e3d.firebaseapp.com",
            databaseURL: "https://f2e2018-10e3d.firebaseio.com",
            projectId: "f2e2018-10e3d",
            storageBucket: "f2e2018-10e3d.appspot.com",
            messagingSenderId: "315995849194",
            appId: "1:315995849194:web:5103d9e1d0bc2da0"
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

