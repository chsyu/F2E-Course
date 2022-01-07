
// INITIALIZE FIREBASE
firebase.initializeApp({
  apiKey: "AIzaSyBBixpAodVLz3GxDGQooTYYjUUXeyu9bzA",
  authDomain: "f2e2021-44d38.firebaseapp.com",
  projectId: "f2e2021-44d38",
  storageBucket: "f2e2021-44d38.appspot.com",
  messagingSenderId: "657878254604",
  appId: "1:657878254604:web:50f895d5225f3006c81a29",
});

// REFERENCE FIRESTORE INSTAGRAM DOCUMENT
let dbRef = firebase.firestore()
  .collection("instagram");
let queryDB = dbRef.orderBy("timeStamp", "asc");
// let dbRef = instagramdb.orderBy("timeStamp", "asc");
// REFERENCE FIREBASE STORAGE
let storageRef = firebase.storage().ref();
// DECLARE WEB STATE VARIABLES
// (All dynamic web variables are delcared here)
let state = {
  profile: {
    name: 'F2E',
    email: 'f2e@gmail.com',
    photoURL: 'https://firebasestorage.googleapis.com/v0/b/f2e2018-10e3d.appspot.com/o/users%2Fjsf2e.png?alt=media&token=3e40fcf8-0cef-45f6-a383-35a3e42b73d4'
  },
  uploadFile: '',
  posts: [
    {
      _id: '0',
      dbID: '0',
      username: 'socleansofreshh',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me_3.jpg',
      postImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/tropical_beach.jpg',
      likes: 36,
      upVoted: true,
      caption: "When you're too ready for summer '18 ☀️",
      timeStamp: 0000
    },
    {
      _id: '1',
      dbID: '1',
      username: 'djirdehh',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me2.png',
      postImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/downtown.jpg',
      likes: 20,
      upVoted: false,
      caption: 'Views from the six...',
      timeStamp: 0001
    },
    {
      _id: '2',
      dbID: '2',
      username: 'puppers',
      userImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/pug_personal.jpg',
      postImage: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/puppers.jpg',
      likes: 49,
      upVoted: false,
      caption: 'Current mood 🐶',
      timeStamp: 0002
    }
  ]
};

// RENDER SCREEN
updatePosts();
// REGISTER JQUERY EVENTS
$("#imageUpload").change(function () { previewImage(this); });
$("#avatar-upload__btn").click(uploadImage);

// DECLARE FUNCTIONS
function previewImage(input) {
  if (input.files[0]) {
    state.uploadFile = input.files[0];
    let reader = new FileReader();
    reader.onload = function (readerEvent) {
      $('#avatar-preview').html(
        `<img src="${readerEvent.target.result}">`
      );
      $("#avatar-preview img").hide();
      $("#avatar-preview img").fadeIn(650);
    }
    reader.readAsDataURL(state.uploadFile);
  }
}

function uploadImage() {
  $('#avatar-upload__btn').addClass('is-loading');
  let msg = $('.caption-input').val();
  storageRef
    .child(`IGimages/${state.uploadFile.name}`)
    .put(state.uploadFile)
    .then(function (snapshot) {
      return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
    })
    .then(function (downloadURL) {
      console.log(`downloadURL = ${downloadURL}`);
      uploadPost(downloadURL, msg);
    })
    .catch(function (error) {
      console.log(`Failed to upload file and get link - ${error}`);
    });
}

function uploadPost(url, msg) {
  dbRef.add({
    "userName": state.profile.name,
    "userImage": state.profile.photoURL,
    "postImage": url,
    "likes": 0,
    "upVoted": false,
    "caption": msg,
    "timeStamp": Date.now()
  })
  .then(function(){
    $('#avatar-upload__btn').removeClass('is-loading');
    gotoHome();
    updatePosts();
  });
}

function like(id) {
  state.posts.some(function (post) {
    if (post._id == id) {
      post.upVoted ? post.likes-- : post.likes++;
      post.upVoted = !post.upVoted;
    }
  });
  renderPosts();
}

function gotoHome(){
  window.location.href = "./index.html";
}

function updatePosts() {
  queryDB.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
           state.posts.unshift({
            _id: String(Math.floor(Math.random()*10000)),
            dbID: doc.id,
            username: doc.data().userName,
            userImage: doc.data().userImage,
            postImage: doc.data().postImage,
            likes: doc.data().likes,
            upVoted: doc.data().upVoted,
            caption: doc.data().caption,
            timeStamp: doc.data().timeStamp
            });            
        });
        console.log(state.posts);
        renderPosts()
    })
    .catch(function(e){
      console.log('error'+e);
    })
}

function renderPosts() {
  $('#instagram-post').html('');
  state.posts.forEach(function (post) {
    let postItem =
      `
  <li class="instagram-post__item">
    <div class="header level">
      <div class="level-left">
        <figure class="header-image is-32x32">
          <img src="${post.userImage}" />
        </figure>
        <span class="username">${post.username}</span>
      </div>
      <div class="level-right">
        <p class="header-menu">•••</p>
      </div>
    </div>

    <figure class="image-container">
      <img 
        class="post-image" 
        src="${post.postImage}" 
        ondblclick="like(${post._id})"
      />
    </figure>
    <div class="content">
      <div class="heart">
        <i class="far fa-heart fa-lg ${post.upVoted ? 'fas' : ''}"
          data-id=${post._id}
          onclick="like(${post._id})">
        </i>
      </div>
      <p class="likes">${post.likes} 個讚</p>
      <p class="caption"><span>${post.username}</span> ${post.caption}</p>
    </div>
  </li>
  `;
    $('#instagram-post').append(postItem);
  });

}