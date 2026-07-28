const V = "gainz-v1";
const U = [
  "https://cdn.jsdelivr.net/npm/preact@10.19.3/dist/preact.umd.js",
  "https://cdn.jsdelivr.net/npm/preact@10.19.3/hooks/dist/hooks.umd.js",
  "https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.umd.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(U).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

// Cache-first apenas para as libs de CDN já pré-cacheadas.
// Todo o resto (inclusive o index.html) vai direto para a rede,
// para que atualizações do app apareçam sem precisar limpar cache.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
