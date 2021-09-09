db.enablePersistence().catch(err=>{
    if(err.code=='failed-precondition') console.log('multiple tab open', err.code)
    else if (err.code=='unimplemented') console.log('persistance not supported', err.code)
})





db.collection('recipes').onSnapshot((currentSnapShot)=>{

    currentSnapShot.docChanges().forEach(element => {
        // if added 
        if (element.type === 'added'){
            renderRecipe(element.doc.data(), element.doc.id);  

        }


        //id removed 
        if (element.type === 'removed'){
            removeRecipe(element.doc.data(), element.doc.id);  
        }

    });
})