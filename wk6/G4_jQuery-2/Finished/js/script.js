$(document).ready(function(){
	$('#name').change(function(){
		$('.bind-data').html($(this).val());
	});
	$('#number').change(function(){
		$('.bind-number').append($(this).val()+'<br>');
	});

	$(".slideDown").click(function(){
		$(".panel").slideDown(500);
	});
	$(".slideUp").click(function(){
		$(".panel").slideUp(500);
	});

});
