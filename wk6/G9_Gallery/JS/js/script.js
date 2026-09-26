// jQuery 的 'fast' 等於 200ms
document.querySelectorAll(".nav__item").forEach(function (item) {
  const submenu = item.querySelector(":scope > .nav__list--submenu");
  if (!submenu) return;

  item.addEventListener("mouseenter", function () {
    //When trigger is hovered...
    Velocity(submenu, "finish");
    Velocity(submenu, "slideDown", { duration: 200 });
  });
  item.addEventListener("mouseleave", function () {
    Velocity(submenu, "finish");
    Velocity(submenu, "slideUp", { duration: 200 });
  });
});

document.querySelectorAll(".gallery__item").forEach(function (item) {
  const overlay = item.querySelector(":scope > .overlay");

  item.addEventListener("mouseenter", function () {
    // Fade in overlay
    Velocity(overlay, "finish");
    Velocity(overlay, "slideDown", { duration: 800 });
  });
  item.addEventListener("mouseleave", function () {
    // Fade out overlay
    Velocity(overlay, "finish");
    Velocity(overlay, "slideUp", { duration: 500 });
  });
});
