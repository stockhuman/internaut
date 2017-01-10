/*
  Navigation
*/

(function ($) {
	'use strict';
	  // navigation

	  function toggleNav() {
	    if (document.body.classList.contains('nav-is-open')) {
	      $('#nav-toggle').css('color', 'black');
	      document.body.classList.remove('nav-is-open');
	    } else {
	      document.body.classList.add('nav-is-open');
	      $('#nav-toggle').css('color', 'white');
	    }
	  }
	  $('#nav-toggle').click(function(){
	    toggleNav();
	  });

	  $('#nav-main').mouseleave(function() {
			setTimeout(function() {
				toggleNav();
			}, 200);
	  });

		$(window).on('scroll', function() {
			if (document.body.classList.contains('nav-is-open')) {
	      $('#nav-toggle').css('color', 'black');
	      document.body.classList.remove('nav-is-open');
			}
		});

}(jQuery));
