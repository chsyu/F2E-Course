$(document).ready(function() {

	// when a nav parent is clicked
	$(".alt-nav > ul > li").click(function() {
		// if section is already active and clicked again
		if ( $(this).hasClass("active-click") ) {
			$(this).removeClass("active-click");
			$(this).children("ul").slideUp();
		} else {
		// if section is made active
			$(".alt-nav ul ul").slideUp();
			$(".alt-nav li").removeClass("active-click");
			$(this).addClass("active-click");
			$(this).children("ul").slideDown();
			return false;
		}
	}); // end click event handler
});
