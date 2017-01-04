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
