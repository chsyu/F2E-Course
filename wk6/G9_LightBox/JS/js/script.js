const lightbox = GLightbox({
  selector: ".gallery__item-link",
  loop: true
});

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

document.querySelectorAll(".gallery__item-link").forEach(function (link) {
  const overlay = link.querySelector(":scope > .overlay");

  link.addEventListener("mouseenter", function () {
    // Fade in overlay
    Velocity(overlay, "finish");
    Velocity(overlay, "fadeIn", { duration: 800 });
  });
  link.addEventListener("mouseleave", function () {
    // Fade out overlay
    Velocity(overlay, "finish");
    Velocity(overlay, "fadeOut", { duration: 500 });
  });
});
