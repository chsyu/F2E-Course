$(function(){
   new WOW().init();
   // init ScrollMagic controller
   let controller = new ScrollMagic.Controller({
      globalSceneOptions: {duration:$("body").height()}
   });
   // build ScrollMagic scene
   new ScrollMagic.Scene({triggerElement: '#navEffect'})
                  .setClassToggle("nav", "navbar__effect")
                  // .addIndicators()
                  .addTo(controller);

});

