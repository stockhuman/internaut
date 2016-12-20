/*

*/

(function ($) {
  'use strict';

}(jQuery));

/*
  Navigation
*/

(function () {
  'use strict';
  
}());

/*

*/

// smoothState
(function($){
  "use strict";
  var options = {
      prefetch: true,
      cacheLength: 2,
      debug: true,
      onStart: {
        duration: 250, // Duration of our animation
        render: function ($container) {
          // Add your CSS animation reversing class
          $container.addClass('is-exiting');

          // Restart your animation
          smoothState.restartCSSAnimations();
        }
      },
      onReady: {
        duration: 0,
        render: function ($container, $newContent) {
          // Remove your CSS animation reversing class
          $container.removeClass('is-exiting');

          // Inject the new content
          $container.html($newContent);

        }
      }
    },
    smoothState = $('#main').smoothState(options).data('smoothState');
}(jQuery));

/*
  UI
*/

(function ($) {
  'use strict';
  $(document).ready(function(){

    // preloader animation
    $('#preloader').addClass('loaded');

    // transitioner panels here w/ delay
    window.setTimeout(function(){ $('#preloader').addClass('hidden'); },1500);

  });
}(jQuery));
