/**
 * Michael Hemingway
 * (c) 2017
 *
 * I'll probably switch everything over to Vue
 */

 // SMOOTHSTATE
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
		navColors(); // color the nav
		resetNav(); // hide the transitioner / close the nav

		// fix collection styling
		if ((window.location.href.indexOf("collection") > -1)) {
			body.addClass('collection');
		} else { body.removeClass('collection'); }

		body.toggleClass('is-exiting');

		$.readyFn.execute();
	}
});

// add nav links to smoothState
$(".nav-list-item a, #nav-home-icon a").click(function(e) {
	e.preventDefault();
	var c = $("#container").smoothState().data("smoothState"),
			l = $(this).attr("href");
	c.load(l);
});

// MISC_____________________________________

// add console text
window.addEventListener("load", function (event) {
	var c = 'color: #bada55; background: #222;';
	console.log('%c ( ͠° ͟ʖ ͡°)', c);
	console.log('%c Nothing to see here.', c);
});