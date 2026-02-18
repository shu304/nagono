const CACHE_NAME = "nagono-cache-v1";

const urlsToCache = [
  "/",
  "/index.html",
  "/oden.html",
  "/ippin.html",
  "/yasai.html",
  "/yaki.html",
  "/age.html",
  "/shokuji.html",
  "/kanmi.html",
  "/course4500.html",
  "/course6500.html",
  "/course8500.html",
  "/style.css",
  "/index.css"
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
