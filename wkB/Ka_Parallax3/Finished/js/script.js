$(function(){
  var $thumbs = $('.animate1'),
      $nav = $('.navbar-fixed-top'),
      paralltop = $('.parallax1').offset().top,
      winheight = $(window).height(),
      jumboheight = $('.parallax1').outerHeight();
      fullheight = $(document).height(),
      style = document.createElement("style");

  $(window).scroll(function(){
    animate_elems();
  });

	$('.navbar-toggle').click(function(){
		$(this).toggleClass('open');
	});

  // Append the style tag to head
  document.head.appendChild(style);

  // Grab the stylesheet object
  sheet = style.sheet

  function animate_elems() {
    // calculate distance from top of window
    var wintop = $(document).scrollTop();
    // toggle navbar effect
    if(wintop >= 120) {
      $nav.addClass('navbar-effect');
    } else {
      $nav.removeClass('navbar-effect');
    }

    // Parallax movement computations
    var mparalltop = (paralltop + jumboheight - (wintop + winheight))*0.3;
    // $('.fixed').css('transform',`rotate(${mparalltop}deg)`);
    // sheet.insertRule('.parallax1::before { transform: translateY('+mparalltop+'px) }', 0);

    sheet.addRule('.parallax1::before', 'transform: translateY('+mparalltop+'px) ');

    // check animate1
    $thumbs.each(function(index){
      $thumb = $(this);
      // if already animated skip to the next item
      if($thumb.hasClass('fadeInUp')) { return true; }
      // element's distance from top of page in pixels
      else {
        topcoords = $thumb.offset().top;
        if(wintop > (topcoords - winheight)*.75) {
          // animate when top of the window is 3/4 above the element
          $thumb.addClass('fadeInUp');
          switch(index){
            case 0:
            $thumb.addClass('animate_delay0');
            break;
            case 1:
            $thumb.addClass('animate_delay1');
            break;
            case 2:
            $thumb.addClass('animate_delay2');
            break;
          } //end switch-case
        } //end if
      } //end else
    }); //end each selector
  } // end animate_elems()
});


new WOW().init();
