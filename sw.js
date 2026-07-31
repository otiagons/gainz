// KILL SWITCH — substitui o sw.js antigo (que apontava pro CDN jsdelivr obsoleto).
// Este arquivo existe só para se auto-desregistrar e limpar todo o cache que o
// service worker anterior deixou instalado no navegador. O app não usa mais
// service worker externo (index.html cuida de limpar qualquer resquício sozinho).
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(client => client.navigate(client.url));
  })());
});
