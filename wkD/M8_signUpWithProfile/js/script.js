// Firebase 已在 firebaseConfig.js 中初始化
// REFERENCE TO FIREBASE AUTH
const auth = firebase.auth();

// STORE PROFILE INFO
let profile_Name, 
    profile_photoURL;

// REGISTER DOM ELEMENTS
// index.html、signup.html、profile.html 共用此檔案，元素不一定存在，使用前要先檢查
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');
const userName = document.querySelector('#userName');
const photoURL = document.querySelector('#photoURL');
const avatarImage = document.querySelector('.avatar-image');
const avatarName = document.querySelector('.avatar-name');
const avatarEmail = document.querySelector('.avatar-email');
if (signInfo) signInfo.textContent = "";

// SignIn
if (btnSignIn) {
  btnSignIn.addEventListener('click', function (e) {
    btnSignIn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    auth.signInWithEmailAndPassword(email.value, password.value)
      .then(function (e) {
        btnSignIn.innerHTML = `Sign In`;
        window.location.href = "./profile.html";
      })
      .catch(function (e) {
        btnSignIn.innerHTML = `Sign In`;
        console.log(e.message);
        if (signInfo) signInfo.textContent = e.message;
      });
  });
}

// SignUp
if (btnSignUp) {
  btnSignUp.addEventListener('click', function (e) {
    console.log('sign up now ...');
    btnSignUp.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    auth.createUserWithEmailAndPassword(email.value, password.value)
      .then(function () {
        const user = auth.currentUser;
        user.updateProfile({
          displayName: userName.value,
          photoURL: photoURL.value
        })
        .then(function () {
          btnSignUp.innerHTML = `Sign Up`;
          email.value = '';
          password.value = '';
          userName.value = '';
          photoURL.value = '';
          window.location.href = "./profile.html";
        });
      })
      .catch(function (e) {
        btnSignUp.innerHTML = `Sign Up`;
        if (signInfo) signInfo.textContent = e.message;
      });
  });
}

// Listening Login User
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    if (signInfo) signInfo.textContent = `${user.email} is login...`;
    user.providerData.forEach(function (profile) {
      console.log(`  Sign-in provider: ${profile.providerId}`);
      console.log(`  Provider-specific UID: ${profile.uid}`);
      console.log(`  Name: ${profile.displayName}`);
      console.log(`  Email: ${profile.email}`);
      console.log(`  Photo URL: ${profile.photoURL}`);
      profile_Name = profile.displayName;
      profile_photoURL = profile.email;
      if (avatarName) avatarName.textContent = profile.displayName;
      if (avatarEmail) avatarEmail.textContent = profile.email;
      if (avatarImage && profile.photoURL) {
        avatarImage.src = profile.photoURL;
      }
    });
  } else {
    console.log("not logged in");
  }
});


// Signout
if (btnSignOut) {
  btnSignOut.addEventListener('click', function () {
    auth.signOut();
    if (email) email.value = '';
    if (password) password.value = '';
    if (signInfo) signInfo.textContent = 'No one login...';
    window.location.href = "./index.html";
  });
}
