// Offline support: keep the app files on the device so it opens without internet.
// Stale-while-revalidate: show the saved copy at once, refresh it in the background.
var CACHE = 'ntawusigara-v7';
var FILES = ['./', 'index.html', 'data.js', 'ntw-tools.js', 'ntw-charts.js', 'ntw-context.js', 'ntw-vup.js', 'ai-model.js', 'ai-local.js', 'manifest.webmanifest', 'icon.svg'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); })); });
self.addEventListener('activate', function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener('fetch', function (e) {
  var req = e.request; if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then(function (c) { return c.match(req).then(function (hit) {
    var net = fetch(req).then(function (r) { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(function () { return hit; });
    return hit || net;
  }); }));
});
