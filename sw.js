const CACHE_NAME = 'flex-house-cafe-v2.2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/data/reviews.json',
  '/assets/js/menu-data.js',
  '/assets/js/app.js',
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

// Install: Cache core application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old caches
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

// Fetch: Stale-While-Revalidate strategy for lightning-fast loads
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For same-origin requests
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // Offline fallback
            return cachedResponse;
          });

          return cachedResponse || fetchPromise;
        });
      })
    );
  }
});
