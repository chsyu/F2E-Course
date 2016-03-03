$(document).ready(function(){
	$('.myLink').click(function(){
		// $('h1').css('font-size','40px');
		$('h1').html('<i>Clicked!</i>')
		alert($('h1').text());
	});

	$('.myLink').mouseenter(function(){
		$('h1').addClass('red');
	});

	$('.myLink').mouseleave(function(){
		$('h1').removeClass('red');
	});
});
