const CACHE_NAME = "mono-v2";
var urlsToCache = [
    "/",
    "/favicon.ico",
    "/loader.css",
    "/manifest.json",
    "/service-worker.js",
    "/js/sw.js",
    "/css/chunk-0101c9e5.864cefa8.css",
    "/css/chunk-01c87504.5b89c66e.css",
    "/css/chunk-aff1a576.6f61bd1e.css",
    "/js/chunk-0101c9e5.922e630e.js",
    "/js/chunk-01c87504.fe98a1a0.js",
    "/js/chunk-2d22c341.08c3cdee.js",
    "/js/chunk-634c71cd.115891d5.js",
    "/js/chunk-aff1a576.93fb7dca.js",
    "/css/app.16a13d22.css",
    "/css/chunk-vendors.08875cb3.css",
    "/js/app.79aeec2d.js",
    "/js/chunk-vendors.bead2ddb.js",
    "/logo.png",
    "/96.png",
    "/192.png"

  ];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });