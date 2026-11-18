// Supabase 已在 ../_supabase/supabaseConfig.js 中初始化

const ROOM_ID = 'chatroom1';

let profile_Name;
let profile_photoURL;

// index.html、signup.html、firechat.html 共用此檔案，元素不一定存在，使用前要先檢查
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const btnSignIn = document.querySelector('#btnSignIn');
const btnSignUp = document.querySelector('#btnSignUp');
const btnSignOut = document.querySelector('#btnSignOut');
const signInfo = document.querySelector('#sign-info');
const cardHeader = document.querySelector('#card-header');
const messageField = document.querySelector('#message-field');
const messageList = document.querySelector('#message-list');
const userName = document.querySelector('#user-name');
const userPhoto = document.querySelector('#user-photo');
const userNameField = document.querySelector('#userName');
const photoURLField = document.querySelector('#photoURL');
if (signInfo) signInfo.textContent = '';

if (cardHeader) cardHeader.textContent = 'SUPA CHAT';

function applyProfileUI(user) {
  if (!user) return;
  const meta = user.user_metadata ?? {};
  profile_Name = meta.display_name ?? null;
  profile_photoURL = meta.photo_url ?? null;
  if (signInfo) signInfo.textContent = `${user.email} is login...`;
  if (userName) userName.textContent = meta.display_name ?? '';
  if (userPhoto && meta.photo_url) {
    userPhoto.src = meta.photo_url;
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
    window.location.href = './firechat.html';
  });
}

// SignUp
if (btnSignUp) {
  btnSignUp.addEventListener('click', async () => {
    console.log('sign up now ...');
    btnSignUp.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;

    profile_Name = userNameField.value;
    profile_photoURL = photoURLField.value;

    const { error } = await supabaseClient.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: profile_Name,
          photo_url: profile_photoURL,
        },
      },
    });

    if (error) {
      console.log(error.message);
      btnSignUp.innerHTML = `Sign Up`;
      if (signInfo) signInfo.textContent = error.message;
      return;
    }

    await supabaseClient.auth.updateUser({
      data: {
        display_name: profile_Name,
        photo_url: profile_photoURL,
      },
    });

    btnSignUp.innerHTML = `Sign Up`;
    email.value = '';
    password.value = '';
    userNameField.value = '';
    photoURLField.value = '';
    console.log('Update successful.');
    window.location.href = './firechat.html';
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

function renderMessages(rows) {
  if (!messageList) return;
  messageList.innerHTML = '';
  // 為何用 createElement + textContent：聊天內容不可信，避免 XSS
  rows.forEach((row) => {
    const senderName = row.sender_name || 'anonymous';
    const message = row.message;

    const messageElement = document.createElement('li');
    messageElement.className = 'message-item';

    const nameElement = document.createElement('strong');
    nameElement.className = 'chat-username';
    nameElement.textContent = `${senderName}:`;

    messageElement.append(nameElement, document.createTextNode(` ${message ?? ''}`));
    messageList.append(messageElement);
  });
  messageList.scrollTop = messageList.scrollHeight;
}

async function loadMessages() {
  if (!messageList) return;
  const { data, error } = await supabaseClient
    .from('chat_messages')
    .select('*')
    .eq('room_id', ROOM_ID)
    .order('time_stamp', { ascending: true });

  if (error) {
    console.error(error);
    return;
  }
  renderMessages(data ?? []);
}

function subscribeMessages() {
  if (!messageList) return;
  supabaseClient
    .channel(`secured-chat:${ROOM_ID}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chat_messages',
        filter: `room_id=eq.${ROOM_ID}`,
      },
      () => loadMessages()
    )
    .subscribe();
}

if (messageField) {
  messageField.addEventListener('keypress', async (e) => {
    if (e.key !== 'Enter') return;

    const message = messageField.value;
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    const { error } = await supabaseClient.from('chat_messages').insert({
      room_id: ROOM_ID,
      sender_name: profile_Name,
      message,
      time_stamp: Date.now(),
      user_id: user?.id ?? null,
    });

    if (error) {
      console.error(error);
      if (signInfo) signInfo.textContent = error.message;
      return;
    }

    messageField.value = '';
  });
}

loadMessages();
subscribeMessages();
