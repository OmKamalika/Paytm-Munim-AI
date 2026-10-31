/* Only public fallback assets belong in this cache. Never cache account pages,
 * API data, consent, payments, POST requests or React Server Component payloads. */
const CACHE_PREFIX = 'paytmunim-offline-';
const CACHE_NAME = `${CACHE_PREFIX}m4-v1`;
const OFFLINE_PAGE = '/offline.html';
const PUBLIC_ASSETS = [
  OFFLINE_PAGE,
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/maskable-192.png',
  '/icons/maskable-512.png',
  '/icons/apple-touch-icon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PUBLIC_ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys
    .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
    .map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return; }
  if (/^\/api(?:\/|$)/i.test(pathname)
    || /(?:^|\/)(?:consent|payments?)(?:\/|$)/i.test(pathname)
    || /^\/_next(?:\/|$)/i.test(pathname)
    || /\.rsc$/i.test(pathname)
    || url.searchParams.has('_rsc')
    || request.headers.has('RSC')
    || request.headers.has('Next-Router-Prefetch')
    || request.headers.has('Next-Router-State-Tree')
    || (request.headers.get('Accept') || '').toLowerCase().includes('text/x-component')) return;

  if (!url.search && PUBLIC_ASSETS.includes(pathname)) {
    event.respondWith(caches.open(CACHE_NAME).then(async (cache) =>
      (await cache.match(pathname)) || fetch(request)));
    return;
  }

  if (request.mode !== 'navigate') return;
  // Network-only documents: a successful response is never written to Cache API.
  event.respondWith(fetch(request, { cache: 'no-store' }).catch(async () => {
    const cache = await caches.open(CACHE_NAME);
    return (await cache.match(OFFLINE_PAGE)) || new Response('Reconnect to continue. Actions require a connection.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }));
});
