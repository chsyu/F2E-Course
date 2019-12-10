$(document).ready(function () {

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBWkL1ZDkWwGW8IaEVFEhniEJFfM284wwE",
    authDomain: "f2e2018-10e3d.firebaseapp.com",
    databaseURL: "https://f2e2018-10e3d.firebaseio.com",
    projectId: "f2e2018-10e3d",
    storageBucket: "f2e2018-10e3d.appspot.com",
    messagingSenderId: "315995849194",
    appId: "1:315995849194:web:5103d9e1d0bc2da0"
  });

  // REFERENCE FIREBASE STORAGE
  let storageRef = firebase.storage().ref();

  // Declare variables
  let filePath;

  // REGISTER JQUERY EVENTS
  $('#input-file').change(setFilePath);
  $('#btnUpload').click(uploadFile);

  function setFilePath() {
    filePath = this.files[0];
  }

  function uploadFile() {
    $('#btnUpload').html(`<span class = "spinner-border spinner-border-sm"></span>`);
  
    // REFERENCE UPLOAD FILE
    let fileRef = storageRef.child(`uploadFiles/${filePath.name}`);
  
    // UPLOAD FILE TO FIRESTORAGE
    fileRef.put(filePath)
      .then(function (snapshot) {
        return snapshot.ref.getDownloadURL(); 
      })
      .then(function (downloadURL) {
        $('#btnUpload').html('Upload');
        $('#upload-filename').html(`<a href="${downloadURL}">${filePath.name}</a> has been uploaded`)
      })
      .catch(function (error) {
        $('#btnUpload').html('Upload');
        console.log(`Failed to upload file and get link - ${error}`);
      });
  }

});
