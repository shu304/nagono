const CACHE_NAME = "nagono-cache-v8";

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
  "/nagono/index.css",
  "/nagono/images/",
  "/nagono/images/otosi.jpg",
  "/nagono/images/uzura.jpg",
  "/nagono/images/ankimo.jpg",
  "/nagono/images/ikakimo.jpg",
  "/nagono/images/chamame.jpg",
  "/nagono/images/sunagimo.jpg",
  "/nagono//images/kyouage-mentai.jpg",  
  "/nagono/images/aburi-ika.jpg",
  "/nagono/images/cream-cheese-saikyo.jpg",
  "/nagono/images/dashimaki.jpg",
  "/nagono/images/matcha_ice.jpg",
  "/nagono/images/kushikatsu.jpg" ,
  "/nagono/images/satoimo_isobe.jpg",
  "/nagono/images/karaage.jpg",
  "/nagono/images/tai_meshi.jpg",
  "/nagono/images/chicken_sansho.jpg",
  "/nagono/images/kyuri_salad.jpg",
  "/nagono/images/yuba_salad.jpg",
  "/nagono/images/harutamanegi.jpg",
  "/nagono/images/kaki.jpg",
  "/nagono/images/satoimo.jpg",
  "/nagono/images/lettuce.jpg",
  "/nagono/images/broccoli.jpg",
  "/nagono/images/kyomizuna.jpg",
  "/nagono/images/yakiniku-nasu.jpg",
  "/nagono/images/akashiyaki.jpg",
  "/nagono/images/tomato.jpg",
  "/nagono/images/tofu.jpg",
  "/nagono/images/gyusuji.jpg",
  "/nagono/images/kakuni.jpg",
  "/nagono/images/horumon.jpg",
  "/nagono/images/sakuraebi_takikomi.jpg",
  "/nagono/images/tofu_mentai_salad.jpg",
  "/nagono/images/cream-cheese-shiraae.jpg",
  "/nagono/images/yakumi-tofu.jpg",
  "/nagono/images/tsukimi.jpg",
  "/nagono/images/namafu_dengaku.jpg",
  "/nagono/images/onion_miso.jpg",
  "/nagono/images/saba_mentai.jpg",
  "/nagono/images/potato_fry.jpg",
  "/nagono/images/banana_toron.jpg",
  "/nagono/images/gyoza.jpg",
  "/nagono/images/wakame.jpg",

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

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

