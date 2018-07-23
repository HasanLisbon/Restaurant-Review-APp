
var version="V.1.0";
//listing all the files which should be cached
var cacheFiles=[
    '/',
    '/index.html',
    '/data/restaurants.json',
    '/restaurant.html',
    '/css/styles.css',
    '/css/responsive.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/fork.png',
    '/img/coffee.png',
    '/img/restaurant.png'

];
//installing service worker
self.addEventListener('install',(e)=>{
    console.log('Service worker is installed');
   e.waitUntil(
       caches.open(version).then((cache)=> {
           console.log('Caching cahce files');
           return cache.addAll(cacheFiles);
       })
   );
});
//activating service worker
self.addEventListener('activate', (e) => {
    console.log('Service worker is activated');
    var version= ['V.2.0'];
  e.waitUntil(
      caches.keys().then((keyList)=> {
          return Promise.all(keyList.map((key)=> {
              if (version.indexOf(key) === -1) {
                  return caches.delete(key);
              }
          }));
      })
  );
})
//fetching and cloning  data with service worker
self.addEventListener('fetch', (e) => {
    console.log('Service worker is activated');
    e.respondWith(
        caches.match(e.request).then((response)=>{
            return response|| fetch (e.request).then((resp)=>{
                return caches.open(version).then((cache)=>{
                    cache.put(event.request, response.clone());
                    return response;
                })
            })
        })
    )
})