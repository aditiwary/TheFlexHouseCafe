const CACHE_NAME = 'flexhouse-v5.4';
const STATIC_ASSETS = [
  '/',
  '/index.html?v=flexhouse-5.4',
  '/manifest.json?v=flexhouse-5.4',
  '/assets/css/style.css?v=flexhouse-5.4',
  '/assets/data/reviews.json?v=flexhouse-5.0',
  '/assets/js/menu-data.js?v=flexhouse-5.4',
  '/assets/js/app.js?v=flexhouse-5.4',
  '/assets/images/flex-logo.png',
  '/assets/images/flex-logo.svg',
  '/assets/images/favicon.png',
  '/assets/images/favicon-32x32.png',
  '/assets/images/storefront.jpg',
  '/assets/images/flex-pizza.jpg',
  '/assets/images/flex-momos-noodles.jpg',
  '/assets/images/flex-burger-coffee.jpg',
  '/assets/images/combo-menu.jpg',
  '/assets/images/main-menu.jpg'
];

// Install: Cache core application shell & skip waiting immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate: Clean up ALL legacy caches instantly
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
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strict Network-First Strategy ensuring freshest assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback only when network fails
          return caches.match(event.request);
        })
    );
  }
});
