$(document).ready(function () {

  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyAQKwxMuQhIurwq1M9hNElD3-k_wr2mSQk",
    authDomain: "f2e2024.firebaseapp.com",
    projectId: "f2e2024",
    storageBucket: "f2e2024.firebasestorage.app",
    messagingSenderId: "285513778962",
    appId: "1:285513778962:web:8713c63655e4d9414c55cb",
  });

  // REFERENCE FIREBASE DATABASE
  const db = firebase.firestore();
  const imageCollectionRef = db.collection("images");

  // Declare variables
  let filePath;
  

  // REGISTER JQUERY EVENTS
  $('#input-file').change(setFilePath);
  $('#imageUpload').change(setFilePath);
  $('#btnUpload').click(uploadImage);
  $('#avatar-label').on('dragover', onDragOver);
  $('#avatar-label').on('dragleave', onDragLeave);
  $('#avatar-label').on('drop', onDrop);

  function onDragOver(ev) {
    ev.preventDefault();
    $('#avatar-label').addClass("opacity06")
  }

  function onDragLeave(ev) {
    ev.preventDefault();
    $('#avatar-label').removeClass("opacity06")
  }

  function onDrop(ev) {
    ev.preventDefault();
    $('#avatar-label').removeClass("opacity06")
    filePath = ev.originalEvent.dataTransfer.files[0];
    $('.input-label').html(`Select your file: ${filePath.name}`);
  }

  function setFilePath() {
    filePath = this.files[0];
    $('.input-label').html(`Select your file: ${filePath.name}`);
  }

  function uploadImage() {
    $("#btnUpload").html(
      `<span class = "spinner-border spinner-border-sm"></span>`
    );
    // Convert File to Base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result.split(",")[1];
      imageCollectionRef
        .add({
          name: filePath.name,
          base64: base64String,
          uploadedAt: Date.now(),
        })
        .then((docRef) => {
          $("#btnUpload").html("Upload");
          console.log(`Image uploaded successfully! Document ID: ${docRef.id}`);

        })
        .catch((error) => {
          $("#btnUpload").html("Upload");
          console.log(`Failed to upload file - ${error}`);
        });
    };

    // Read file as Data URL
    reader.readAsDataURL(filePath);
  }

});
