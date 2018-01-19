/**
	Main navigation interactivity, colors
	support in IE 10+
*/

var navToggle = document.getElementById('nav-toggle'),
		bodyClass = document.body.classList,
		navIcons  = document.getElementsByClassName('nav-list-container')[0],
		navIsOpen = false,
		navMain   = document.getElementById('nav-main'),
		bg, accent;

function toggleNav () {
	// nav is open, close it
	if (bodyClass.contains('nav-is-open')) {
		navIsOpen = false;
		bodyClass.remove('nav-is-open');

	// nav is closed, open it
	} else {
		// navAnimOpen();
		navIsOpen = true;
		bodyClass.add('nav-is-open');
	}
}

function navColors() {
	if ($('article.page').attr('data-base') != (undefined)) {
		bg = $('article.page').attr('data-base');
		accent = $('article.page').attr('data-highlight');
	} else {
		bg = '#292F35';
		accent = '#fff';
	}

	$(navMain).css('background', bg);
	$('#transitioner').css('background', bg);
	$(navMain).css('color', accent);

	$('#nav-toggle span').each(function() {
		$(this).css('background', accent);
	});

	$('meta[name=theme-color]').remove();
	$('head').append('<meta name="theme-color" content="'+bg+'">');
}

function resetNav() {
	if (navIsOpen) {
		navIsOpen = false;
		document.body.classList.remove('nav-is-open');
	}
}

// Load the colors on fresh page
$(document).ready(function() { navColors(); });

// Interaction
navMain.addEventListener('mouseleave', function() {
	if (navIsOpen) { toggleNav(); }
});
navToggle.addEventListener('click', function () {
	toggleNav();
});

window.onscroll = function () { if (navIsOpen) { toggleNav(); } }


/** Anime js animation plugin */

// causes too many problems for now

// function navAnimOpen () {
// 	anime({
// 		targets: '#nav-inner',
// 		translateX: -100,
// 		opacity: 0,
// 		complete : function() {
// 			anime({
// 				targets: '#nav-inner',
// 				translateX: 0,
// 				opacity: 1,
// 			})
// 		}
// 	})
// }

// function navAnimClose () {
// 	anime({
// 		targets: '#nav-inner',
// 		translateX: -100,
// 		opacity: 0
// 	})
// }
