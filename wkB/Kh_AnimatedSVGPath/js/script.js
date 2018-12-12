$(function(){
   new WOW().init();
   function pathPrepare ($el) {
		var lineLength = $el[0].getTotalLength();
		$el.css("stroke-dasharray", lineLength);
		$el.css("stroke-dashoffset", lineLength);
	}

   let $path = $("path");
   
	// prepare SVG
	pathPrepare($path);


   // init ScrollMagic controller
   let controller = new ScrollMagic.Controller();
   // build tween
	let tween = new TimelineMax()
   .add(TweenMax.to($path, 0.9, {strokeDashoffset: 0, ease:Linear.easeNone})) // draw path for 0.9
   .add(TweenMax.to("path", 1, {stroke: "#33629c", ease:Linear.easeNone}), 0);			// change color during the whole thing

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
   new ScrollMagic.Scene({
                  triggerElement: "#trigger1", 
                  duration: 200, 
                  tweenChanges: true
               })
               .offset(200)
					.setTween(tween)
					.addIndicators() // add indicators (requires plugin)
					.addTo(controller);

});

