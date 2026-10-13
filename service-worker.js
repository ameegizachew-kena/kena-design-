const CACHE_NAME = "kena-design-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./login.html",
  "./register.html",
  "./student.html",
  "./dashboard.html",
  "./admin.html",
  "./lesson.html",
  "./lesson2.html",
  "./lesson3.html",
  "./script.js",
  "./style.css",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      await Promise.all(
        FILES_TO_CACHE.map(async file => {
          try {
            await cache.add(file);
          } catch (error) {
            console.warn("Cache hin milkoofne:", file, error);
          }
        })
      );
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith("kena-design-") && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  // Website kana qofa irratti hojjedhu.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request).then(response => {
      if (response.ok && request.url.startsWith(self.location.origin)) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      if (request.mode === "navigate") {
        return caches.match("./index.html");
      }

      return new Response("Internet hin jiru; fuulli kun cache keessa hin jiru.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    })
  );
});
