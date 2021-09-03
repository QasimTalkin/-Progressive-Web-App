//install event list and do stuff 
self.addEventListener('install', (evt) =>{

    console.log('Install Triggered', evt);

});

// listen for activate event 
self.addEventListener('activate', (evt)=>{
    console.log('sw activated', evt)
});

// fetch event 
self.addEventListener('fetch', (evt)=> {
console.log(evt);
});