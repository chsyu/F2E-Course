$(document).ready(function(){
  // REGISTER DOM ELEMENTS
  const $title = $('#title');
  const $id = $("#id");

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

  let db = firebase.firestore();
  let usersRef = db.collection("users");
  // usersRef.add({
  //   "name": "NTUE",
  //   "age": 13,
  //   "tel": {
  //     "tel1": "111-111",
  //     "tel2": "222-111"
  //   }
  // });

  let docRef = usersRef.doc("1167");

  // docRef.get().then(function(doc){
  //   $id.html(`doc 1167' name = ${doc.data().name}`)
  // });



  // docRef.set({
  //   "name": "Alex1",
  //   "age": 27,
  //   "tel": {
  //     "tel1": "111-111",
  //     "tel2": "222-111"
  //   }
  // });

  docRef.update({
    "name": "John Doe"
  });

  docRef.onSnapshot(
    function(doc){
      $title.html(`user name = ${doc.data().name}, user age = ${doc.data().age}`);
    }
  );

});
