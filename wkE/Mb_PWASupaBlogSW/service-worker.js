/**
 * Mb：註冊 Service Worker 並攔截 fetch，但不做快取。
 * 為何透明轉發而非空 handler：避免舊教材「空 fetch 騙過安裝檢查」的反模式；
 * 真實 Cache／離線策略留給 Mc。
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
