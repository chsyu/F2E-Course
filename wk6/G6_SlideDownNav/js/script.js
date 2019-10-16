$(document).ready(function() {

	$(".nav__list-item").hover(function () { //When trigger is hovered...
        $(this).children(".nav__list--submenu").slideDown('fast');
    }, function () {
        $(this).children(".nav__list--submenu").slideUp('slow');
    });

});
