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

  const overlay_template = function (title, desc) {
    return `
      <div class="overlay">
        <h3 class="overlay__title">${title}</h3>
        <hr class="overlay__divider" />
        <p class="overlay__desc">${desc}</p>
      </div>
    `;
  };

  $(".gallery__item")
    .on("mouseenter", function () {
      // Get title and description
      const title = $(this).data("title");
      const desc = $(this).data("desc");
      // Append overlay
      if ($(this).children(".overlay").length === 0)
        $(this).append(overlay_template(title, desc));
      // Show overlay
      $(this).children(".overlay").slideDown(800);
    })
    .on("mouseleave", function () {
      // Hide overlay
      $(this).children(".overlay").slideUp(500);
    });
});
