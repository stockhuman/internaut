/* Main navigation
*
* IE 10+
*/

// global
navIsOpen = false;

(function ($) {
	'use strict';

	var navToggle = document.getElementById('nav-toggle'),
			bodyClass = document.body.classList,
			navIcons  = document.getElementsByClassName('nav-list-container')[0];

	function toggleNav () {
		navAnimation();
		// nav is open, close it
		if (bodyClass.contains('nav-is-open')) {
			navIsOpen = false;
			bodyClass.remove('nav-is-open');
		} else {
			navIsOpen = true;
			bodyClass.add('nav-is-open');
		}
	}


	function navAnimation () {
		// if (window.jQuery) {
		// 	$(navIcons).animate({
		// 		opacity: 0;
		// 	}, 500)
		// 	.animate({
		// 		opacity: 1;
		// 	}, 500);
		// }
	}


	// Interaction

	navToggle.addEventListener('click', function() { 
		toggleNav(); 
	});

	document.getElementById('nav-main').addEventListener('mouseleave', function() {
		if (navIsOpen) { toggleNav(); }
	});

	window.onscroll = function () { if (navIsOpen) { toggleNav(); } }
}(jQuery));