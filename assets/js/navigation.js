/*
  Navigation
*/

(function ($) {
	'use strict';

	'use strict';
	  $(document).ready(function(){
	    // init masonry
	    $('.grid').masonry({transitionDuration: 0});

	    // color theory
	    $('.grid-item').each(function(){
	      $(this).find('.grid-item-overlay').css('background', $(this).attr('data-base'));
	      $(this).find('.grid-item-overlay').css('color', $(this).attr('data-highlight'));
	    });

	  });


	  $('#main').smoothState({
	    onAfter: function() {
	      $('.grid').masonry({transitionDuration: 0});

	      // color theory
	      $('.grid-item').each(function(){
	        $(this).find('.grid-item-overlay').css('background', $(this).attr('data-base'));
	        $(this).find('.grid-item-overlay').css('color', $(this).attr('data-highlight'));
	      });
	    }
	  });


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

	  $('#nav-main').mouseleave(function(){
	    toggleNav();
	  });


	$('.menu-item a').click(function (e) {
		e.preventDefault();
		var content = $('#main').smoothState().data('smoothState'),
		href = $(this).attr('href');
		content.load(href);
	});


}(jQuery));
