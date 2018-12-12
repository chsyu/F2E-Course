$(function(){
   new WOW().init();
   // init ScrollMagic controller
   let controller = new ScrollMagic.Controller();
   // build ScrollMagic scene
   new ScrollMagic.Scene({
                  triggerElement: '#navEffect',
                  duration: $("body").height()
               })
               .setClassToggle("nav", "navbar__effect")
               // .addIndicators()
               .addTo(controller);

   new ScrollMagic.Scene({
                  triggerElement: '#parallax1',
                  triggerHook: 1,
                  duration: '200%'
               })
               .setTween(TweenMax.from('.parallax1__bg', 1, {y: '-30%', ease: Power0.easeNone}))
               // .addIndicators()
               .addTo(controller);

});

