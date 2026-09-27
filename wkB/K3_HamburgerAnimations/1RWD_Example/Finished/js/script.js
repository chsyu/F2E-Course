let menu_click = false;
const navList = document.querySelector(".nav__list");
const iconBar = document.querySelector(".navbar__icon-bar");

iconBar.addEventListener("click", function () {
  menu_click = !menu_click;
  if (menu_click) {
    navList.classList.add("menu-click");
    iconBar.setAttribute("menu-click", "true");
  } else {
    navList.classList.remove("menu-click");
    iconBar.setAttribute("menu-click", "false");
  }
});
