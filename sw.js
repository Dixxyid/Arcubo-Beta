const CACHE_NAME = 'arcubo-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/dashboard.html',
  '/learning.html',
  '/quiz.html',
  '/about.html',
  '/guides.html',
  '/feedback.html',
  '/markerbeta.html',
  '/page/detail.html',
  '/styles/dashboard.css',
  '/styles/learning-style.css',
  '/styles/page-detail.css',
  '/scripts/learning-engine.js',
  '/scripts/detail.js',
  '/data/planets.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && event.request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
