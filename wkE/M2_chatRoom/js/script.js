// Supabase 已在 ../_supabase/supabaseConfig.js 中初始化

const ROOM_ID = "chatroom1";

// REGISTER DOM ELEMENTS
const messageField = document.querySelector('#message-field');
const nameField = document.querySelector('#name-field');
const messageList = document.querySelector('#message-list');

function renderMessages(rows) {
  messageList.innerHTML = "";
  // 為何用 createElement + textContent：訊息來自使用者／資料庫，不可當 HTML 插入以免 XSS
  rows.forEach((row) => {
    const senderName = row.sender_name || "anonymous";
    const message = row.message;

    const messageElement = document.createElement("li");
    messageElement.className = "message-item";

    const nameElement = document.createElement("strong");
    nameElement.className = "chat-username";
    nameElement.textContent = `${senderName}:`;

    messageElement.append(nameElement, document.createTextNode(` ${message ?? ""}`));
    messageList.append(messageElement);
  });
  messageList.scrollTop = messageList.scrollHeight;
}

async function loadMessages() {
  const { data, error } = await supabaseClient
    .from("chat_messages")
    .select("*")
    .eq("room_id", ROOM_ID)
    .order("time_stamp", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }
  renderMessages(data ?? []);
}

function subscribeMessages() {
  // Supabase Realtime 不會像 onSnapshot 自動給完整快照，故先 load 再訂閱
  supabaseClient
    .channel(`chat:${ROOM_ID}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat_messages",
        filter: `room_id=eq.${ROOM_ID}`,
      },
      () => {
        loadMessages();
      }
    )
    .subscribe();
}

messageField.addEventListener("keypress", (e) => {
  if (e.key !== "Enter") return;

  const senderName = nameField.value;
  const message = messageField.value;

  supabaseClient
    .from("chat_messages")
    .insert({
      room_id: ROOM_ID,
      sender_name: senderName,
      message,
      time_stamp: Date.now(),
    })
    .then(({ error }) => {
      if (error) {
        console.error(error);
        return;
      }
      messageField.value = "";
    });
});

loadMessages();
subscribeMessages();
