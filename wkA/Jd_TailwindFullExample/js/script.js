// when a hanburger menu is clicked
const list = document.querySelector("#nav__list");
const menu = document.querySelector("#menu_btn");

menu.addEventListener("click", function () {
	// toggle hidden Class
	list.classList.toggle("hidden");
}); // end click event handler
