const CACHE_NAME = "nagono-cache-v2";

const urlsToCache = [
  "/nagono/",
  "/nagono/index.html",
  "/nagono/oden.html",
  "/nagono/ippin.html",
  "/nagono/yasai.html",
  "/nagono/yaki.html",
  "/nagono/age.html",
  "/nagono/shokuji.html",
  "/nagono/kanmi.html",
  "/nagono/course4500.html",
  "/nagono/course6500.html",
  "/nagono/course8500.html",
  "/nagono/style.css",
  "/nagono/index.css"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
