import { db } from './firebaseConfig.js';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';

const messagesCollectionRef = collection(db, 'chatrooms', 'chatroom1', 'messages');
const messagesQuery = query(messagesCollectionRef, orderBy('timeStamp', 'asc'));

const messageField = document.querySelector('#message-field');
const nameField = document.querySelector('#name-field');
const messageList = document.querySelector('#message-list');

messageField.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;

  const senderName = nameField.value.trim();
  const message = messageField.value.trim();
  if (!message) return;

  messageField.value = '';
  addDoc(messagesCollectionRef, {
    senderName,
    message,
    timeStamp: Date.now(),
  });
});

onSnapshot(messagesQuery, (querySnapshot) => {
  let html = '';

  querySnapshot.forEach((item) => {
    const data = item.data();
    const senderName = data.senderName || 'anonymous';
    const message = data.message ?? '';

    html += `<li class="message-item"><strong class="chat-username">${senderName}:</strong> ${message}</li>`;
  });

  messageList.innerHTML = html;
  messageList.scrollTop = messageList.scrollHeight;
});
