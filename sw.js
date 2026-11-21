// MyTagihan Desa 3.0 — service worker: aplikasi tetap bisa dibuka tanpa sinyal.
// Halaman diambil dari jaringan dulu (versi baru langsung terpakai), cadangan dari simpanan bila offline.
// Tidak pernah menyimpan permintaan ke server sinkron (Google) — data hanya di IndexedDB perangkat.
// Hanya menghapus simpanan miliknya sendiri (awalan mytagihan-desa-), bukan milik LENSA PK / Monitor SPPG di akun GitHub yang sama.
const AWALAN = 'mytagihan-desa-';
const SIMPANAN = AWALAN + 'v4.1.1';
const BERKAS = ['./', './index.html', './manifest.webmanifest', './ikon-192.png', './ikon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(SIMPANAN).then(c => c.addAll(BERKAS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.indexOf(AWALAN) === 0 && k !== SIMPANAN).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const salin = r.clone(); caches.open(SIMPANAN).then(c => c.put(e.request, salin)); }
    return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))));
});
