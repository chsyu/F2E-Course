// when a hanburger menu is clicked
const ul = document.querySelector(".nav__list");
const menu = document.querySelector(".nav__menu");

menu.addEventListener("click", function () {
	// toggle menu-click Class
	ul.classList.toggle("menu-click");
}); // end click event handler
