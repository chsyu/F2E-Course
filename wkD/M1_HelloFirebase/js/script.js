$(document).ready(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
    authDomain: "f2e2018-10e3d.firebaseapp.com",
    databaseURL: "https://f2e2018-10e3d.firebaseio.com",
    projectId: "f2e2018-10e3d",
    storageBucket: "f2e2018-10e3d.appspot.com",
    messagingSenderId: "315995849194"
  };
  firebase.initializeApp(config);
  var dbRef = firebase.database().ref().child('abc');
  var $title = $('#title');
  dbRef.on('value', function(snap){
    $title.html(snap.val());
  });
});
