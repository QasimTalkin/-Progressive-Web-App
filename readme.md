# PWA basic concepts

## [Live link](https://qasimtalkin.github.io/Progressive-Web-App/)

Simple guide to creating quick Progressive web apps.

## Normal website to Native mobile features

* install on homepage
* access app offline
* push notifications

## PWA vs Native

### Native

* Made with device specific SDK
* publish on store then installed
* runs on device and has access to device features
* used offline and has notifications 

### PWA

* uses Web tech
* accessed via web
* can be installed
* used offline and push notification

## As webAPP (manifest, HTML, css ....)

* Basic project template set up 

### Step 1 L Web App manifest

* Json file with info for browser on how to display the app on phone
* Root of the project
* `manifest.json`
* Json file
  * short_name ->  used for icon name on device.
  * display:standalone -> not like browser
  * background_color -> when first loading app
  * orientation -> portrait-primary
  * inco-> add array of icon 
* Link json in all html files `<link rel="manifest" href="/manifest.json">`

### Android Emulator 
* android studio 
* go to pc loclhoset address 10.0.2.2:portn 

### iphone os
* icon not suported
* insert link in html
* 
```html
<link rel="apple-touch-icon" href="img/icons/88.png">
<link rel="apple-touch-icon" href="img/icons/256.png">
<!-- and so on-->
 ```

* For status bar `<meta name="apple-mobile-web-app-status-bar" content="#aa7700">`

## As progressive webAPP (service worker)

* Load content offline without internet
* sync data upon connection
* push notification
* Runs on a diffrent thread irrespective of html page (has not acess to DOM)
* background process
* listens for event in background to reposed accordingly
  
### service worker life Cycle 

* project we create `sw.js` giving it global scope
* first register it on browser with app.js or main js
* upon registration its put on separate sw thread
* fires installs event (we can do multiple manipulations here)
* fires active event (sw now listens for events)
* upon refresh does nothing unless sw code changes
* new sw active event gets strted only when app tab/browser with old SW are closed

### Registering service worker

* created in root dir `sw.js` for global access 
#### regitering sw using `app.js`

* look for browser support 
* returns promise 
```js
// Service worker registration 
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then((reg)=>{
        console.log("service worker registered ", reg)
    }).catch((error)=> console.log("Could not register worker", error));
  } else console.log("SW not supported");
```

#### Install event 

* while sw is being installed 'install event' is triggred 
* we lsiten for this on sw.js
* Install event wont be triggred again unless `sw.js` file has changes
* we could use this to add assets for offline mode (css, js and so on)
* Keep devtools -> update on reload checked


#### Fetch Events
* save a trip to server on fetch 
* look for items in cashe and try to work offline when possible 
  
#### Offline behavior

* load content offline using cashe api
* storing assets locally
* disable browser cashed and we store cashe using sw
* sw store assets from server in cashe
* if we go offline sw looks up cashe
**Resourses we need to cashe**
* App shell assets that dont change over time 
* We do it inside install event handler
```js
  self.addEventListener('install', (evt) =>{
    // console.log('Install Triggered', evt);
    evt.waitUntil(
        caches.open(staticCacheName).then((cache)=>{
            console.warn('adding assets');
            cache.addAll(assets);
            console.warn('Done assets');
        });

    );
    

});
```

#### intercepting request to use cache Offline

* check chashe for fetch request insted of server

* `fetch event listner` we can intercept here 
* on fetch check if resource exists in cache 

```js
self.addEventListener('fetch', (evt)=> {
//console.log(evt);
    
evt.respondWith(caches.match(evt.request).then( response => {
    return response || fetch(evt.request);
}

))
```

#### cache versioning

* delete previous caches
* update new cache based on version currently 
* in activate so new cache is worked on before fetch

**Caching approch**
* wait for user to browse pages to cache
* casche response form server into dynamic assets
* if the page has been cached brose it if not add to dynamic

**What if user visits the page while offline**

* get a 404 for offline page 
* Show a fallback page when offline. 
* Create a fallback page. 
* store it in **static cache** 
* make sure to only display it if the request is resourcing a page. not image or css or something. 

**Limit cache to numbe of items**
* cache size limit function. 

### DATA in PWA

* acessing DATA in PWA
* google firebase 
* create project -> database 
* new collection -> documents -> title and recipes
* 
