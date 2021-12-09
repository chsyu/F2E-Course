$(document).ready(function () {

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
    authDomain: "f2e2021-44d38.firebaseapp.com",
    projectId: "f2e2021-44d38",
    storageBucket: "f2e2021-44d38.appspot.com",
    messagingSenderId: "657878254604",
    appId: "1:657878254604:web:50f895d5225f3006c81a29",
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
