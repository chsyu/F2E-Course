$(document).ready(function () {
  let menu_click = false;

  $(".navbar__icon-bar").click(function () {
    menu_click = !menu_click;
    if (menu_click) {
      $(".nav__list").addClass("menu-click");
      $(".navbar__icon-bar").attr("menu-click", "true");
    } else {
      $(".nav__list").removeClass("menu-click");
      $(".navbar__icon-bar").attr("menu-click", "false");
    }
  });
});
