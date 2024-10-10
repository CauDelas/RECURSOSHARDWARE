const CACHE_NAME = 'nome-do-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/images/logo.png' // Ajuste os caminhos para os arquivos corretos
];

// Instala o Service Worker e adiciona recursos ao cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Recursos em cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Responde a requisições de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Retorna do cache
      }
      return fetch(event.request); // Faz a requisição de rede se não tiver no cache
    })
  );
});
