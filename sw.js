const staticCacheName = 'site-static-v1';
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
    'https://fonts.googleapis.com/icon?family=Material+Icons', 
    'https://fonts.gstatic.com/s/materialicons/v99/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
];

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
    // console.log('sw activated', evt) 
    evt.waitUntil(
        caches.keys().then(keys=> {   
            return Promise.all(keys.filter(everyKey => everyKey !== staticCacheName).map(everyKey => caches.delete(everyKey)))
        })
    )
});

let dem = 0;
// fetch event 
self.addEventListener('fetch', (evt)=> {
//console.log(evt);
    
evt.respondWith(caches.match(evt.request).then( response => {
    return response || fetch(evt.request);
}

))




});