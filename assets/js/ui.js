/*
  UI - Smoothstate
*/

(function ($) {
  'use strict';

  $(document).ready(function(){
    // init masonry
    $('.grid').masonry({transitionDuration: 0});

    // color theory
    $('.grid-item').each(function(){
      $(this).find('.grid-item-overlay').css('background', $(this).attr('data-base'));
      $(this).find('.grid-item-overlay').css('color', $(this).attr('data-highlight'));
    });

    // preloader animation
    $('#preloader').addClass('loaded');

    // transitioner panels here w/ delay
    window.setTimeout(function(){ $('#preloader').addClass('hidden'); },1500);

  });

  // Smoothstate

  $('#main').smoothState({

    onAfter: function() {
      $('.grid').masonry({transitionDuration: 0});
      document.body.classList.remove('nav-is-open');
      // color theory
      $('.grid-item').each(function(){
        $(this).find('.grid-item-overlay').css('background', $(this).attr('data-base'));
        $(this).find('.grid-item-overlay').css('color', $(this).attr('data-highlight'));
      });
    }
  });

  $('.menu-item a').click(function (e) {
    e.preventDefault();
    var content = $('#main').smoothState().data('smoothState'),
    href = $(this).attr('href');
    content.load(href);
  });

}(jQuery));
