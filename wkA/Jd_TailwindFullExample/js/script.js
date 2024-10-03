$(document).ready(function () {
	// when a hanburger menu is clicked
	let $list = $("#nav__list"),
		 $menu = $("#menu_btn");

	$($menu).click(function () {
		// toggle menu-click Class
		$list.toggleClass("hidden");
	}); // end click event handler
});
