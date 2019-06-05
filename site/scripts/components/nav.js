// Implements the navigation bar and related animation

export default class Navigation {
	constructor () {
		this.navToggle = document.getElementById('nav-toggle')
		this.bodyClass = document.body.classList
		this.navIcons = document.getElementsByClassName('nav-list-container')[0]
		this.navIsOpen = false
		this.navMain = document.getElementById('nav-main')
	}

	reset () {

	}

	toggle() {
		// nav is open, close it
		if (this.bodyClass.contains('nav-is-open')) {
			this.navIsOpen = false
			this.bodyClass.remove('nav-is-open')

		// nav is closed, open it
		} else {
			// navAnimOpen();
			this.navIsOpen = true
			this.bodyClass.add('nav-is-open')
		}
	}

	colors () {
// 	if ($('article.page').attr('data-base') != (undefined)) {
// 		bg = $('article.page').attr('data-base');
// 		accent = $('article.page').attr('data-highlight');
// 	} else {
// 		bg = '#292F35';
// 		accent = '#fff';
// 	}

// 	$(navMain).css('background', bg);
// 	$('#transitioner').css('background', bg);
// 	$(navMain).css('color', accent);

// 	$('#nav-toggle span').each(function() {
// 		$(this).css('background', accent);
// 	});

// 	$('meta[name=theme-color]').remove();
// 	$('head').append('<meta name="theme-color" content="'+bg+'">');
// }

// function resetNav() {
// 	if (navIsOpen) {
// 		navIsOpen = false;
// 		document.body.classList.remove('nav-is-open');
// 	}
	}

	mount () {
		document.addEventListener('DOMContentLoaded', this.colors)
	}
}



// // Load the colors on fresh page
// $(document).ready(function() { navColors(); });

// // Interaction
// navMain.addEventListener('mouseleave', function() {
// 	if (navIsOpen) { toggleNav(); }
// });
// navToggle.addEventListener('click', function () {
// 	toggleNav();
// });

// window.onscroll = function () { if (navIsOpen) { toggleNav(); } }

