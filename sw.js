const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'dynamic-cache-v1';
const assets = [
    '/', 
    'index.html', 
    'js/app.js',
    'js/materialize.js',
    'js/materialize.min.js',
    'js/ui.js',
    'css/materialize.css',
    'css/materialize.min.css',
    'css/style.css',
    'img/biryani.png', 
    'img/playstore.png',
    'fallBackPage.html',
    'https://fonts.googleapis.com/icon?family=Material+Icons', 
    'https://fonts.gstatic.com/s/materialicons/v99/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

// limit cahce size #Max number of items 
const limitCacheItem  = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys=>{
            if(keys.length > size){
                cache.delete(keys[0]).then(limitCacheItem(name, size));
            }
        })
    })
}

//install event list and do stuff 
self.addEventListener('install', (evt) =>{
    // console.log('Install Triggered', evt);
    evt.waitUntil(
        caches.open(staticCacheName).then((cache)=>{
            console.warn('adding assets');
            cache.addAll(assets);
            console.warn('Done assets');
        })
    );

});

// listen for activate event 
self.addEventListener('activate', (evt)=>{
    // console.log('sw activated', evt) remove previous cache versions 
    evt.waitUntil(
        caches.keys().then(keys=> {   
            return Promise.all(keys 
                // filter out all chches that are not current and then delete them
                .filter(everyKey => everyKey !== staticCacheName && everyKey !== dynamicCacheName).map(everyKey => caches.delete(everyKey)))
        })
    )
});

let dem = 0;
// fetch event 
self.addEventListener('fetch', (evt)=> {

    if(evt.request.url.indexOf('firebase.googleapis.com')=== -1) {
        evt.respondWith(caches.match(evt.request).then( response => {
                // reply with stored cache
                    return response || fetch(evt.request).then(
                        // add to dynamic cache 
                        newFetchResponse => { 
                            return caches.open(dynamicCacheName).then(cache => {
                                //newFetchResponse can be only used one, we make a copy of it
                                cache.put(evt.request.url, newFetchResponse.clone());
                                limitCacheItem(dynamicCacheName, 15);
                                return newFetchResponse;
                            });
                        }
                    );
                }
        // if erro or unable to serve from server or offline
        // show html page only when request is for a page and not image 
            ).catch(()=>{
                if(evt.request.url.indexOf('.html')>-1) {return caches.match('fallBackPage.html')}// add more if to fall back on iamges or other resource
            })
        );
    } 

});