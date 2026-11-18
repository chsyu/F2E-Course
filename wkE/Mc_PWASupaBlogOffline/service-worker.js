/**
 * Mc：App Shell 預快取 + 執行期快取策略。
 * 靜態資源 cache-first；導航 network-first（失敗回殼或 offline.html）。
 */
const SHELL_CACHE = "supablog-shell-v2";
const IMAGE_CACHE = "supablog-images-v1";

const SHELL_ASSETS = [
  "./",
  "./index.html",
  "./blog.html",
  "./upload.html",
  "./offline.html",
  "./css/style.css",
  "../_supabase/supabaseConfig.js",
  "./js/index.js",
  "./js/blog.js",
  "./js/upload.js",
  "./js/pwa.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      await cache.addAll(SHELL_ASSETS);
      self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key !== SHELL_CACHE && key !== IMAGE_CACHE)
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
    })()
  );
});

const isNavigationRequest = (request) =>
  request.mode === "navigate" ||
  (request.method === "GET" &&
    request.headers.get("accept")?.includes("text/html"));

const isStaticAsset = (url) =>
  /\.(?:css|js|webmanifest)$/i.test(url.pathname) ||
  url.pathname.includes("/icons/");

const isImageRequest = (url) =>
  /\.(?:png|jpe?g|gif|webp|svg)$/i.test(url.pathname);

const networkFirstNavigation = async (request) => {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(SHELL_CACHE);
    // 為何忽略 query：blog.html?id=… 共用同一文件殼，避免為每個 id 各存一份 HTML
    const shellUrl = request.url.split("?")[0];
    cache.put(shellUrl, networkResponse.clone());
    return networkResponse;
  } catch {
    const cached =
      (await caches.match(request)) ||
      (await caches.match(request, { ignoreSearch: true }));
    if (cached) return cached;
    return (await caches.match("./offline.html")) || Response.error();
  }
};

const cacheFirst = async (request, cacheName) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  return networkResponse;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // 同源以外（Supabase CDN、Unsplash 等）不進 shell 策略
  if (url.origin !== self.location.origin) {
    if (isImageRequest(url)) {
      event.respondWith(
        cacheFirst(request, IMAGE_CACHE).catch(() => caches.match(request))
      );
    }
    return;
  }

  if (isNavigationRequest(request)) {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(
      cacheFirst(request, SHELL_CACHE).catch(() => caches.match(request))
    );
    return;
  }

  if (isImageRequest(url)) {
    event.respondWith(
      cacheFirst(request, IMAGE_CACHE).catch(() => caches.match(request))
    );
  }
});
