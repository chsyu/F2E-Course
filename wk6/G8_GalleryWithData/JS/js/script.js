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

const overlay_template = function (title, desc) {
  return `
    <div class="overlay">
      <h3 class="overlay__title">${title}</h3>
      <hr class="overlay__divider" />
      <p class="overlay__desc">${desc}</p>
    </div>
  `;
};

document.querySelectorAll(".gallery__item").forEach(function (item) {
  item.addEventListener("mouseenter", function () {
    // Get title and description
    const title = item.dataset.title;
    const desc = item.dataset.desc;
    // Append overlay
    if (!item.querySelector(":scope > .overlay"))
      item.insertAdjacentHTML("beforeend", overlay_template(title, desc));
    // Show overlay
    const overlay = item.querySelector(":scope > .overlay");
    Velocity(overlay, "finish");
    Velocity(overlay, "slideDown", { duration: 800 });
  });
  item.addEventListener("mouseleave", function () {
    // Hide overlay
    const overlay = item.querySelector(":scope > .overlay");
    Velocity(overlay, "finish");
    Velocity(overlay, "slideUp", { duration: 500 });
  });
});
