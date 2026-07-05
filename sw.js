const CACHE_NAME = 'timezone-explorer-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Event: Cache all core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and storing assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Serve cached content when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file if found, otherwise fetch from internet
      return response || fetch(event.request);
    })
  );
});