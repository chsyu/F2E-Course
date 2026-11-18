// Supabase 已在 ../_supabase/supabaseConfig.js 中初始化

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');

// SignIn
btnSignIn.addEventListener('click', async () => {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    signInfo.textContent = error.message;
  }
});

// SignUp
btnSignUp.addEventListener('click', async () => {
  const { error } = await supabaseClient.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    signInfo.textContent = error.message;
  }
});

// Listening Login User
supabaseClient.auth.onAuthStateChange((_event, session) => {
  const user = session?.user;
  if (user) {
    signInfo.textContent = `${user.email} is login...`;
    console.log(user);
  } else {
    console.log('not logged in');
  }
});

// Signout
btnSignOut.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  email.value = '';
  password.value = '';
  signInfo.textContent = 'No one login...';
});
