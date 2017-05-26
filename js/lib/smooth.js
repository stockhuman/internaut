/**
	SmoothState ajax page loading plugin
*/

(function($) {
	'use strict';

	var body = $('body');

	// avoid deprecated synchronous call (http://stackoverflow.com/questions/24639335/)
	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) { options.async = true; });

	// Smoothstate JQ plugin
	$('#container').smoothState({
		blacklist: '.no-smoothState',
		onStart : {
			duration: 450,
			// Alterations to the page
			render: function () {
				// Quickly toggles a class and restarts css animations
				body.toggleClass('is-exiting');
			}
		},

		onAfter: function () {
			navColors();
			resetNav();
			if ((window.location.href.indexOf("collection") > -1)) {
				body.addClass('collection');
			} else {
				body.removeClass('collection');
			}
			body.toggleClass('is-exiting');
			$('.isotope').isotope(); // check for grids to reposition
		}
	});

	// add nav links to smoothState
	$(".nav-list-item a, #nav-home-icon a").click(function(e) {
		e.preventDefault();
		var c = $("#container").smoothState().data("smoothState"),
				l = $(this).attr("href");
		c.load(l);
	});

}(jQuery));
