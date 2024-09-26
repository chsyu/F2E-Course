$(document).ready(function () {
  lightbox.option({
    'resizeDuration': 200,
    fitImagesInViewport	: true,
    'wrapAround': true
  });

  $(".nav__list-item").hover(
    function () {
      //When trigger is hovered...
      $(this).children(".nav__list--submenu").slideDown("fast");
    },
    function () {
      $(this).children(".nav__list--submenu").slideUp("fast");
    }
  );

  $(".gallery__item-link").hover(
    function () {
      // Fade in overlay
      $(this).children(".overlay").fadeIn(800);
    },
    function () {
      // Fade out overlay
      $(this).children(".overlay").fadeOut(500);
    }
  );
});
