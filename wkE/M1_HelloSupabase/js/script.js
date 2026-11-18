// Supabase 已在 ../_supabase/supabaseConfig.js 中初始化

// REGISTER DOM ELEMENTS
const title = document.querySelector('#title');
const docElement = document.querySelector('#doc');

const DEMO_USER_ID = "1167";

// 寫入／覆蓋 demo_users 一列（對應 Firestore set）
async function upsertDemoUser() {
  const { error } = await supabaseClient.from("demo_users").upsert({
    id: DEMO_USER_ID,
    name: "Alex2",
    age: 27,
    tel: {
      tel1: "111-111",
      tel2: "222-111",
    },
  });
  if (error) {
    console.error(error);
    docElement.textContent = `寫入失敗：${error.message}`;
  }
}

// 讀取單列（對應 docRef.get）
async function loadDemoUser() {
  const { data, error } = await supabaseClient
    .from("demo_users")
    .select("*")
    .eq("id", DEMO_USER_ID)
    .maybeSingle();

  if (error) {
    console.error(error);
    docElement.textContent = `讀取失敗：${error.message}`;
    return;
  }

  // 為何用 textContent：資料庫欄位可能含惡意字串，不可當 HTML 插入
  if (data) {
    docElement.textContent = `doc ${DEMO_USER_ID} name = ${data.name}`;
  } else {
    docElement.textContent = `doc ${DEMO_USER_ID} 不存在`;
  }
}

async function main() {
  await upsertDemoUser();
  await loadDemoUser();
}

main();

// 可選：即時監聽（對應 onSnapshot）
// supabaseClient
//   .channel("demo-user")
//   .on(
//     "postgres_changes",
//     { event: "*", schema: "public", table: "demo_users", filter: `id=eq.${DEMO_USER_ID}` },
//     (payload) => {
//       const row = payload.new;
//       if (row) title.textContent = `user name = ${row.name}, user age = ${row.age}`;
//     }
//   )
//   .subscribe();
