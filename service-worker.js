"use strict";

const CACHE_NAME = "kena-design-v2";

const APP_FILES = [
  "./",
  "./index.html",
  "./manifest.json"
];

// Install app files
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(APP_FILES);
      })
  );

  self.skipWaiting();
});

// Activate the new version without deleting other apps' caches
self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (name) {
            return name.startsWith("kena-design-") &&
                   name !== CACHE_NAME;
          })
          .map(function (name) {
            return caches.delete(name);
          })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// Fetch and offline support
self.addEventListener("fetch", function (event) {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Do not cache external websites or services
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(request)
      .then(function (response) {
        if (response && response.ok) {
          const copy = response.clone();

          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }

        return response;
      })
      .catch(function () {
        return caches.match(request).then(function (cached) {
          if (cached) {
            return cached;
          }

          // Show the homepage offline only for navigation requests
          if (request.mode === "navigate") {
            return caches.match("./index.html");
          }

          return new Response("Internet hin jiru. Maaloo irra deebi'i.", {
            status: 503,
            statusText: "Offline",
            headers: {
              "Content-Type": "text/plain; charset=utf-8"
            }
          });
        });
      })
  );
});
