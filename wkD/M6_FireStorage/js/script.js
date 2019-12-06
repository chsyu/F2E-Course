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
  let uploadFile;

  // REGISTER JQUERY EVENTS
  $('#upload-input').change(function () {
    uploadFile = this.files[0];
  });
  $('#btnUpload').click(upload);

  function upload() {
    $('#btn-spinner').addClass('spinner-border spinner-border-sm');
    storageRef
      .child(`uploadFiles/${uploadFile.name}`)
      .put(uploadFile)
      .then(function (snapshot) {
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(function (downloadURL) {
        console.log(`downloadURL = ${downloadURL}`);
        $('#btn-spinner').removeClass('spinner-border spinner-border-sm');
        $('#upload-filename').html(`${uploadFile.name} has been uploaded`)
      })
      .catch(function (error) {
        console.log(`Failed to upload file and get link - ${error}`);
      });
  }

});
