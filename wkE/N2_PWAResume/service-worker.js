importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

workbox.skipWaiting()
workbox.clientsClaim()

// precache

workbox.core.setCacheNameDetails({
  prefix: 'cache',
  precache: 'precache',
  runtime: 'runtime'
})

workbox.precaching.precacheAndRoute([
  {
    url: "manifest.json",
    revision: "001",
  },
  {
    url: "service-worker.js",
    revision: "001",
  },
  {
    url: "favicon.ico",
    revision: "001",
  },
  {
    url: "index.html",
    revision: "003",
  },
]);


// runtime cache
// cache fontawesome
workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://use.fontawesome.com",
  workbox.strategies.staleWhileRevalidate({
    cacheName: "fontawesome",
  })
);

// cache the styles

workbox.routing.registerRoute(
  new RegExp('.css$'),
  workbox.strategies.cacheFirst({
    cacheName: 'cache-Style',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 20,
        purgeOnQuotaError: true
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp(".js$"),
  workbox.strategies.cacheFirst({
    cacheName: "cache-Js",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days max cache time
        maxEntries: 20, // 20 max cache request
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// cache the images

workbox.routing.registerRoute(
  new RegExp('.(jpg|jpeg|png|svg|webp)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'cache-Images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true
      })
    ]
  })
)

