const CACHE_NAME='today-assistant-v2';
const urlsToCache=['./','./index.html'];

self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache))
    .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(names=>Promise.all(
      names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  e.respondWith(
    caches.match(e.request).then(response=>{
      return response||fetch(e.request).then(fetchRes=>{
        return caches.open(CACHE_NAME).then(cache=>{
          cache.put(e.request,fetchRes.clone());
          return fetchRes;
        });
      });
    }).catch(()=>{
      return caches.match('./index.html');
    })
  );
});