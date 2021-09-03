$( document ).ready(function() {
    // Nav menu 
    const sideMenu = $('.side-menu'); 
    M.Sidenav.init(sideMenu, {edge: 'right'});

    const sideForm = $('.side-form'); 
    M.Sidenav.init(sideForm, {edge: 'left'});

  });