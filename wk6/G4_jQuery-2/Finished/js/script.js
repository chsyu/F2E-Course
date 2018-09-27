$(document).ready(function(){

	// html and text value
	$('.mg1>p').html('<h1>hello html</h1>');
	$('.mg2>p').text('<h1>hello text</h1>');
	console.log($('.mg1').text());
	console.log($('.mg1').html());

	// form value
	$('#name').change(function(){
		$('.bind-data').html($(this).val());
	});
	$('#number').change(function(){
		$('.bind-number').append($(this).val()+'<br>');
	});

	// slide effects
	$(".slideDown").click(function(){
		$(".panel").slideDown(500);
	});
	$(".slideUp").click(function(){
		$(".panel").slideUp(500);
	});

});
