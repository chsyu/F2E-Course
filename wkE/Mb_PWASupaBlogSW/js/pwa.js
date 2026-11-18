/**
 * Mb：註冊 Service Worker，並以 beforeinstallprompt 提供自訂安裝按鈕。
 * 若 BIP 未觸發（engagement／瀏覽器差異），提示改用瀏覽器選單安裝（Ma 路徑）。
 */
const installBtn = document.querySelector("#installBtn");
const installHint = document.querySelector("#installHint");
let deferredPrompt = null;

const registerServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) {
    console.warn("此瀏覽器不支援 Service Worker");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("./service-worker.js");
    console.log("Service Worker 註冊成功，scope:", registration.scope);
  } catch (error) {
    console.error("Service Worker 註冊失敗:", error);
  }
};

const hideInstallUi = () => {
  if (installBtn) {
    installBtn.hidden = true;
  }
};

const showInstallFallbackHint = () => {
  if (!installHint || deferredPrompt) return;
  installHint.hidden = false;
};

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredPrompt = event;
  if (installBtn) {
    installBtn.hidden = false;
  }
  if (installHint) {
    installHint.hidden = true;
  }
});

window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  hideInstallUi();
  if (installHint) {
    installHint.hidden = true;
  }
  console.log("SupaBlog 已安裝");
});

installBtn?.addEventListener("click", async () => {
  if (!deferredPrompt) {
    showInstallFallbackHint();
    return;
  }

  try {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("安裝結果:", outcome);
  } catch (error) {
    console.error("安裝提示失敗:", error);
  } finally {
    deferredPrompt = null;
    hideInstallUi();
  }
});

registerServiceWorker();

// 給課堂一點時間滿足 engagement；若仍無 BIP，顯示選單安裝提示
window.setTimeout(showInstallFallbackHint, 8000);
