//install event list and do stuff 
self.addEventListener('install', (evt) =>{

    console.log('Install Triggered', evt);

});

// listen for activate event 
self.addEventListener('activate', (evt)=>{
    console.log('sw activated', evt)
});

let dem = 0;
// fetch event 
self.addEventListener('fetch', (evt)=> {
console.log(dem++);
});