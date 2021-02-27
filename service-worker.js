//var cacheName = "johnny-cache-v.2.1.0" //change this if anything has changed on the site
var cacheName = "johnny-cache-v.2.1.0" //change this if anything has changed on the site



//this implements a chache first approach for everything the Website fetches
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
        //console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});





self.addEventListener('activate', event => {
//  console.log("fgdhjfgh");
  // delete any caches that aren't in expectedCaches
  // which will get rid of static-v1
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {

        if (key.includes("johnny-cache")) { //delete every chache from johnny that is now outdated
          return caches.delete(key);
        }
      })

    )).then(() => {
        console.log('V2.1.0 now ready to handle fetches!');
        clients.claim()
    })
  );
});
