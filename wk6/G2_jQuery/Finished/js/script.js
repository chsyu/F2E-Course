$(document).ready(function(){
	$('.myLink').mouseenter(function(){
		$('h1').addClass('red');
	});

	$('.myLink').mouseleave(function(){
		$('h1').removeClass('red');
	});
	$('.myLink').click(function(){
		//$('h1').append('<h3>Hello World</h3>');
		$('h1').css('font-size','40px');
	});
});
