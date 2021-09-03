
// Service worker registration 
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').then((reg)=>{
        console.log("service worker registered ", reg)
    }).catch((error)=> console.log("Could not register worker", error));
  } else console.log("SW not supported");
