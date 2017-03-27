/**
 * The fluff elements, UI pizzaz.
 */

$(function() {
 'use strict';

 var bg, accent;

 function navColors() {
   if ($('article.page').attr('data-base') != (undefined)) {
     bg = $('article.page').attr('data-base');
     accent = $('article.page').attr('data-highlight');
   } else {
     bg = '#3b444c';
     accent = '#fff';
   }

   $('#nav-main').css('background', bg);
	 $('#transitioner').css('background', bg);
   $('#nav-main').css('color', accent);

   $('#nav-toggle span').each(function() {
     $(this).css('background', accent);
   });
  }

  function resetNav() {
    if (navIsOpen) {
      navIsOpen = false;
      document.body.classList.remove('nav-is-open');
    }
  }

  // Load the colors on fresh page
  $(document).ready(function() {
    navColors();
  });

  /**
  * smoothState
  */
  $('#main').smoothState({
    onStart : {
      duration: 450,
      // Alterations to the page
      render: function () {
        // Quickly toggles a class and restarts css animations
        $('body').toggleClass('is-exiting');
      }
    },

    onAfter: function () {
      navColors();
      resetNav();
      if ((window.location.href.indexOf("collection") > -1)) {
        $('body').addClass('collection');
      } else {
        $('body').removeClass('collection');
      }
      $('body').toggleClass('is-exiting');
    }
  });

  // add nav links to smoothState
  $(".nav-list-item a, #nav-home-icon").click(function(e) {
    e.preventDefault();
    var c = $("#main").smoothState().data("smoothState"),
        l = $(this).attr("href");
    c.load(l);
  });

}(jQuery));


(function () {
  'use strict';
}());

/* Main navigation
*
* IE 10+
*/

// global
navIsOpen = false;

(function () {
  'use strict';

  var navToggle = document.getElementById('nav-toggle'),
      bodyClass = document.body.classList;
      // navIsOpen = false;

  function toggleNav () {
    // nav is open, close it
    if (bodyClass.contains('nav-is-open')) {
      navIsOpen = false;
      bodyClass.remove('nav-is-open');
    } else {
      navIsOpen = true;
      bodyClass.add('nav-is-open');
    }
  }

  // Interaction

  navToggle.addEventListener('click', function() { toggleNav(); });

  document.getElementById('nav-main').addEventListener('mouseleave', function() {
    if (navIsOpen) { toggleNav(); }
  });

  window.onscroll = function () { if (navIsOpen) { toggleNav(); } }
}());
