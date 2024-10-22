$(document).ready(function(){

	// Init ScrollMagic
	var controller = new ScrollMagic.Controller();

	// build a scene
	var ourScene = new ScrollMagic.Scene({
		triggerElement: '#project01 img',
		duration: '90%',
		triggerHook: 0.9
	})
	.setClassToggle('#project01', 'fade-in') // add class to project01
	.addIndicators({
		name: 'fade scene',
		colorTrigger: 'black',
		colorStart: '#75C695',
		colorEnd: 'pink'
	}) // this requires a plugin
	.addTo(controller);

});


















