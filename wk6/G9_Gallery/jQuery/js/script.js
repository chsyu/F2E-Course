$(document).ready(function () {
  $(".nav__item").hover(
    function () {
      //When trigger is hovered...
      $(this).children(".nav__list--submenu").slideDown("fast");
    },
    function () {
      $(this).children(".nav__list--submenu").slideUp("fast");
    }
  );

  $(".gallery__item")
    .on("mouseenter", function () {
      // Fade in overlay
      $(this).children(".overlay").slideDown(800);
    })
    .on("mouseleave", function () {
      // Fade out overlay
      $(this).children(".overlay").slideUp(500);
    });
});
