$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-HLtwNyisgTyewL1fMrhDKWalVHO8C00",
    authDomain: "chsyuf2e-fc8a3.firebaseapp.com",
    databaseURL: "https://chsyuf2e-fc8a3.firebaseio.com",
    storageBucket: "chsyuf2e-fc8a3.appspot.com",
    messagingSenderId: "95937071947"
  };
  firebase.initializeApp(config);
  var dbRef = firebase.database().ref().child('object');
  var $title = $('#title');
  dbRef.on('value', function(snap){
    $title.html(snap.val());
  });
});
