// Supabase 已在 ../_supabase/supabaseConfig.js 中初始化

let profile_Name;
let profile_photoURL;

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
if (signInfo) signInfo.textContent = '';

function applyProfileUI(user) {
  if (!user) return;
  const meta = user.user_metadata ?? {};
  profile_Name = meta.display_name ?? null;
  profile_photoURL = meta.photo_url ?? null;

  if (signInfo) signInfo.textContent = `${user.email} is login...`;
  if (avatarName) avatarName.textContent = meta.display_name ?? '';
  if (avatarEmail) avatarEmail.textContent = user.email ?? '';
  if (avatarImage && meta.photo_url) {
    avatarImage.src = meta.photo_url;
  }
}

// SignIn
if (btnSignIn) {
  btnSignIn.addEventListener('click', async () => {
    btnSignIn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    btnSignIn.innerHTML = `Sign In`;
    if (error) {
      console.log(error.message);
      if (signInfo) signInfo.textContent = error.message;
      return;
    }
    window.location.href = './profile.html';
  });
}

// SignUp + user_metadata（對應 Firebase updateProfile）
if (btnSignUp) {
  btnSignUp.addEventListener('click', async () => {
    console.log('sign up now ...');
    btnSignUp.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;

    const { error } = await supabaseClient.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: userName.value,
          photo_url: photoURL.value,
        },
      },
    });

    btnSignUp.innerHTML = `Sign Up`;

    if (error) {
      if (signInfo) signInfo.textContent = error.message;
      return;
    }

    // 若已有 session，再確保 metadata 寫入
    await supabaseClient.auth.updateUser({
      data: {
        display_name: userName.value,
        photo_url: photoURL.value,
      },
    });

    email.value = '';
    password.value = '';
    userName.value = '';
    photoURL.value = '';
    window.location.href = './profile.html';
  });
}

supabaseClient.auth.onAuthStateChange((_event, session) => {
  const user = session?.user;
  if (user) {
    console.log(user);
    applyProfileUI(user);
  } else {
    console.log('not logged in');
  }
});

if (btnSignOut) {
  btnSignOut.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    if (email) email.value = '';
    if (password) password.value = '';
    if (signInfo) signInfo.textContent = 'No one login...';
    window.location.href = './index.html';
  });
}
