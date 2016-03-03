$(document).ready(function(){
	// Mouseenter Overlay Effect
	$('ul#gallery li').mouseenter(function(){
		// Get data attribute values
		var title = $(this).data('title');
		var desc = $(this).data('desc');
		if(!$(this).children("div").length){
			$(this).append('<div class="overlay"></div>');
		}

		// Get the overlay div
		var overlay = $(this).children('.overlay');

		// Add html to overlay
		overlay.html('<h3>'+title+'</h3><p>'+desc+'</p>');

		// Fade in overlay
		overlay.fadeIn(800);
	});

	// Mouseleave Overlay Effect
	$('ul#gallery li').mouseleave(function(){
		// Get the overlay div
		var overlay = $(this).children('.overlay');

		// Fade out overlay
		overlay.fadeOut(500);
	});
});
