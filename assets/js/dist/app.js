/*

*/

(function ($) {
  'use strict';
  var html = document.getElementsByTagName("html")[0];
  if(html.className == "no-js") {
      html.className = html.className.replace("no-js", "js"); // user has JS enabled
  } 
}(jQuery));

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

/*
  UI
*/

(function ($) {
  'use strict';

  $(document).ready(function(){
    // masonry
    $('#work-feed').masonry();

    // preloader animation
    $('#preloader').addClass('loaded');

    // transitioner panels here w/ delay
    window.setTimeout(function(){ $('#preloader').addClass('hidden'); },1500);

  });


}(jQuery));
