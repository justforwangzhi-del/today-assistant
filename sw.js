const CACHE_NAME='today-v4';

self.addEventListener('install',e=>{
  self.skipWaiting();
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(
    fetch(e.request)
    .then(res=>{
      if(res.ok){
        const resClone=res.clone();
        caches.open(CACHE_NAME).then(c=>c.put(e.request,resClone));
      }
      return res;
    })
    .catch(()=>caches.match(e.request))
  );
});