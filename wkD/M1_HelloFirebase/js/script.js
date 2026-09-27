// REGISTER DOM ELEMENTS
const title = document.querySelector('#title');
const docElement = document.querySelector('#doc');

// INITIALIZE FIREBASE
firebase.initializeApp({
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29",
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

docRef.get().then(function(doc){
  docElement.innerHTML = `doc 1167 name = ${doc.data().name}`;
});

docRef.set({
  "name": "Alex2",
  "age": 27,
  "tel": {
    "tel1": "111-111",
    "tel2": "222-111"
  }
});

// docRef.update({
//   "name": "John Doe"
// });

// docRef.onSnapshot(
//   function(doc){
//     title.innerHTML = `user name = ${doc.data().name}, user age = ${doc.data().age}`;
//   }
// );
