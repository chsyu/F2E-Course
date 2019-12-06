$(document).ready(function(){
  // REGISTER DOM ELEMENTS
  let $title = $('#title');

  // INITIALIZE FIREBASE
  firebase.initializeApp({
    apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
    authDomain: "f2e2018-10e3d.firebaseapp.com",
    databaseURL: "https://f2e2018-10e3d.firebaseio.com",
    projectId: "f2e2018-10e3d",
    storageBucket: "f2e2018-10e3d.appspot.com",
    messagingSenderId: "315995849194",
    appId: "1:315995849194:web:5103d9e1d0bc2da0"
  });

  let db = firebase.firestore();
  let usersRef = db.collection("users");
  // usersRef.add({
  //   "name": "Alex",
  //   "age": 27,
  //   "tel": {
  //     "tel1": "111-111",
  //     "tel2": "222-111"
  //   }
  // });

  let docRef = usersRef.doc("1167");
  docRef.set({
    "name": "Alex",
    "age": 27,
    "tel": {
      "tel1": "111-111",
      "tel2": "222-111"
    }
  });

  // docRef.update({
  //   "name": "John Doe"
  // });

  docRef.onSnapshot(
    function(doc){
      $title.html(`user name = ${doc.data().name}`);
    }
  );

});
