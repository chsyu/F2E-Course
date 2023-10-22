$(document).ready(function() {

	$(".nav__list-item").hover(
        function () { //hover In...
            $(this).children(".nav__list--submenu").slideDown('fast');
        }, 
        function () { //hover Out...
            $(this).children(".nav__list--submenu").slideUp('fast');
    });

    $(".banner").hover(
        function () { //hover In...   
            $(".banner__description").fadeIn(1000)
        }, 
        function () { //hover Out...
            $(".banner__description").fadeOut(500)
        }
    )
});
