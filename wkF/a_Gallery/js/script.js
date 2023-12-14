$(document).ready(function () {

    $(".nav__list-item").hover(function () { //When trigger is hovered...
        $(this).children(".nav__list--submenu").slideDown('fast');
    }, function () {
        $(this).children(".nav__list--submenu").slideUp('slow');
    });

    $('.gallery__item-link').mouseenter(function () {
        // Get data attribute values
        var title = $(this).parent('li').data('title');
        var desc = $(this).parent('li').data('desc');
        if (!$(this).children("div").length) {
            $(this).append('<div class="overlay"></div>');
        }

        // Get the overlay div
        var overlay = $(this).children('.overlay');

        // Add html to overlay
        overlay.html('<h3>' + title + '</h3><p>' + desc + '</p>');

        // Fade in overlay
        overlay.fadeIn(800);
    });

    // Mouseleave Overlay Effect
    $('.gallery__item-link').mouseleave(function () {
        // Get the overlay div
        var overlay = $(this).children('.overlay');

        // Fade out overlay
        overlay.fadeOut(500);
    });


});