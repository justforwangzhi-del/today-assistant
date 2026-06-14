const CACHE_NAME='today-assistant-v1';
const urlsToCache=['/index.html'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
});

self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(response=>response||fetch(e.request)));
});

self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(names=>Promise.all(names.filter(n=>n!==CACHE_NAME).map(n=>caches.delete(n)))));
});