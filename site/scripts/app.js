/**
 * Michael Hemingway
 * (c) 2019
 */

import Navigation from './components/nav'

const nav = new Navigation()

nav.mount()

// // Smoothstate JQ plugin
// $('#container').smoothState({
// 	blacklist: '.no-smoothState',
// 	onStart : {
// 		duration: 450,
// 		// Alterations to the page
// 		render: function () {
// 			// Quickly toggles a class and restarts css animations
// 			body.toggleClass('is-exiting');
// 		}
// 	},
// 	onAfter: function () {
// 		$.readyFn.execute();
// 		navColors(); // color the nav
// 		resetNav(); // hide the transitioner / close the nav

// 		if (window.location.origin == window.location.href) {
// 			document.getElementById('home-canvas').style.opacity = 1;
// 		} else {
// 			document.getElementById('home-canvas').style.opacity = 0.2;
// 		}

// 		// fix collection styling
// 		if ((window.location.href.indexOf("collection") > -1)) {
// 			body.addClass('collection');
// 		} else { body.removeClass('collection'); }

// 		body.toggleClass('is-exiting');
// 	}
// })

// // add nav links to smoothState
// $(".nav-list-item a, #nav-home-icon a").click(function(e) {
// 	e.preventDefault();
// 	var c = $("#container").smoothState().data("smoothState"),
// 			l = $(this).attr("href");
// 	c.load(l);
// });

// // MISC_____________________________________

// // the projects page
// $(document).ready(function () {
// 	var filterBtnGroup = $('#project-filters a');

// 	var projects = $('.isotope').isotope({
// 		itemSelector: '.item',
// 		columnWidth: '.project',
// 		percentPosition: true
// 	});

// 	// filter the isotope layout
// 	filterBtnGroup.on('click', function (e) {
// 		e.preventDefault();
// 		var filterVal = $(this).attr('data-filter');
// 		projects.isotope({filter: filterVal});
// 	});

// 	projects.imagesLoaded().progress( function() {
// 	  projects.isotope('layout');
// 	});
// })
