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
