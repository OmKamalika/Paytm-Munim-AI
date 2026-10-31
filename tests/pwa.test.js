import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import vm from 'node:vm';

const publicFile = (path) => new URL(`../public/${path}`, import.meta.url);

async function serviceWorker({ online = true } = {}) {
  const handlers = new Map();
  const stored = new Map();
  const writes = [];
  const deleted = [];
  const network = [];
  const cache = {
    addAll: async (paths) => {
      for (const path of paths) {
        await access(publicFile(path.slice(1)));
        stored.set(path, new Response(await readFile(publicFile(path.slice(1)))));
      }
      writes.push(...paths);
    },
    match: async (path) => stored.get(typeof path === 'string' ? path : new URL(path.url).pathname)?.clone(),
    put: async (path, response) => { writes.push(path); stored.set(path, response); },
  };
  const context = {
    URL, Response,
    self: {
      location: { origin: 'https://paytmunim.example' },
      addEventListener: (name, handler) => handlers.set(name, handler),
      skipWaiting: async () => {},
      clients: { claim: async () => {} },
    },
    caches: {
      open: async () => cache,
      keys: async () => ['another-app-cache', 'paytmunim-offline-obsolete'],
      delete: async (key) => { deleted.push(key); return true; },
    },
    fetch: async (request) => {
      network.push(request);
      if (!online) throw new TypeError('Network unavailable');
      return new Response('Fresh server page');
    },
  };
  vm.runInNewContext(await readFile(publicFile('sw.js'), 'utf8'), context);
  async function lifecycle(name) {
    const pending = [];
    assert.ok(handlers.has(name), `${name} handler is present`);
    handlers.get(name)({ waitUntil: (promise) => pending.push(promise) });
    await Promise.all(pending);
  }
  async function request(path, options = {}) {
    let response;
    handlers.get('fetch')({
      request: { url: new URL(path, context.self.location.origin).href, method: 'GET', mode: 'navigate', headers: new Headers(), ...options },
      respondWith: (promise) => { response = Promise.resolve(promise); },
    });
    return response ? await response : undefined;
  }
  return { lifecycle, request, writes, deleted, network, stored, handlers };
}

test('the app manifest resolves to explicit install icons with real matching PNG dimensions', async () => {
  const manifest = JSON.parse(await readFile(publicFile('manifest.webmanifest'), 'utf8'));
  assert.equal(manifest.id, '/');
  assert.equal(manifest.scope, '/');
  assert.equal(manifest.start_url, '/');
  assert.equal(manifest.display, 'standalone');
  assert.match(manifest.name, /PayTMunim/);
  for (const purpose of ['any', 'maskable']) {
    for (const size of [192, 512]) {
      const icon = manifest.icons.find((candidate) => candidate.sizes === `${size}x${size}` && candidate.purpose === purpose);
      assert.ok(icon, `${size}px ${purpose} icon is provided`);
      assert.equal(icon.type, 'image/png');
      const png = await readFile(publicFile(icon.src.slice(1)));
      assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
      assert.equal(png.readUInt32BE(16), size);
      assert.equal(png.readUInt32BE(20), size);
    }
  }
  const apple = await readFile(publicFile('icons/apple-touch-icon.png'));
  assert.equal(apple.readUInt32BE(16), 180);
  assert.equal(apple.readUInt32BE(20), 180);
});

test('installation only precaches the offline document, manifest and bundled icons', async () => {
  const worker = await serviceWorker();
  await worker.lifecycle('install');
  assert.ok(worker.stored.has('/offline.html'));
  assert.ok(worker.stored.has('/manifest.webmanifest'));
  assert.ok(worker.writes.every((path) => path === '/offline.html' || path === '/manifest.webmanifest' || path === '/favicon.svg' || /^\/icons\/[^/]+\.(png|svg)$/.test(path)));
  assert.ok(!worker.stored.has('/'));
});

test('API, payment, consent, mutations and Flight requests bypass the worker completely', async () => {
  const worker = await serviceWorker({ online: false });
  await worker.lifecycle('install');
  const writes = worker.writes.length;
  for (const [path, options] of [
    ['/api/cashplan', {}], ['/api', {}], ['/api/execute', { method: 'POST' }],
    ['/', { method: 'POST' }], ['/consent', {}], ['/capital/consent', {}], ['/payment', {}], ['/supplier/payments', {}], ['/%61pi/cashplan', {}],
    ['/?_rsc=token', {}], ['/', { headers: new Headers({ RSC: '1' }) }],
    ['/', { headers: new Headers({ Accept: 'text/x-component' }) }],
    ['/', { headers: new Headers({ 'Next-Router-Prefetch': '1' }) }],
    ['/', { headers: new Headers({ 'Next-Router-State-Tree': '[]' }) }],
    ['/index.rsc', {}], ['/_next/data/build/index.json', {}],
    ['/', { headers: new Headers({ Accept: 'Text/X-Component' }) }],
    ['/_next/static/app.js', { mode: 'cors' }], ['https://other.example/', {}],
  ]) {
    assert.ok(await worker.request(path, options) === undefined, `${path} must remain network-only`);
  }
  assert.equal(worker.network.length, 0);
  assert.equal(worker.writes.length, writes);
  assert.ok(!worker.handlers.has('sync'), 'there is no deferred action queue');
});

test('online navigation always returns the server page without retaining page data', async () => {
  const worker = await serviceWorker();
  await worker.lifecycle('install');
  const writes = worker.writes.length;
  assert.equal(await (await worker.request('/?outlet=dadar')).text(), 'Fresh server page');
  assert.equal(worker.network.length, 1);
  assert.equal(worker.writes.length, writes);
  assert.ok(!worker.stored.has('/?outlet=dadar'));
});

test('failed document navigation returns only the read-only reconnect fallback', async () => {
  const worker = await serviceWorker({ online: false });
  await worker.lifecycle('install');
  const response = await worker.request('/?outlet=sion');
  assert.match(await response.text(), /<h1>Reconnect to continue<\/h1>/);
  assert.equal(worker.network.length, 1);
});

test('unavailable precache still produces an offline response without live account content', async () => {
  const worker = await serviceWorker({ online: false });
  const response = await worker.request('/');
  assert.equal(response.status, 503);
  assert.match(await response.text(), /reconnect/i);
});

test('activation removes obsolete app caches without deleting caches owned by other apps', async () => {
  const worker = await serviceWorker();
  await worker.lifecycle('activate');
  assert.deepEqual(worker.deleted, ['paytmunim-offline-obsolete']);
});
