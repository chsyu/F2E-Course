/**
 * Mc：註冊 Service Worker、自訂安裝按鈕，以及 online／offline 提示橫幅。
 */
const installBtn = document.querySelector("#installBtn");
const installHint = document.querySelector("#installHint");
const offlineBanner = document.querySelector("#offlineBanner");
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

const syncOfflineBanner = () => {
  if (!offlineBanner) return;
  offlineBanner.hidden = navigator.onLine;
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
  console.log("FireBlog 已安裝");
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

window.addEventListener("online", syncOfflineBanner);
window.addEventListener("offline", syncOfflineBanner);

registerServiceWorker();
syncOfflineBanner();
window.setTimeout(showInstallFallbackHint, 8000);
