/*

*/

// smoothState
(function ($) {
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

	$('.menu-item a').click(function (e) {
		e.preventDefault();
		var content = $('#content').smoothState().data('smoothState');
		var href = $(this).attr('href');
		content.load(href);
	});

}(jQuery));
