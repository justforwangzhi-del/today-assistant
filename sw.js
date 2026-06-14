const CACHE_NAME='today-v3';
const BASE='https://justforwangzhi-del.github.io/today-assistant/';
const urlsToCache=[BASE,BASE+'index.html'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>cache.addAll(urlsToCache))
    .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    fetch(e.request)
    .then(res=>{
      const resClone=res.clone();
      caches.open(CACHE_NAME).then(c=>c.put(e.request,resClone));
      return res;
    })
    .catch(()=>caches.match(e.request))
  );
});