// Implements the navigation bar and related animation

export default class Navigation {
	constructor () {
		this.navToggle = null
		this.bodyClass = null
		this.navIcons = null
		this.navIsOpen = false
		this.navMain = null

		this.mount = this.mount.bind(this)
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
		// Load the colors on fresh page
		document.addEventListener('DOMContentLoaded', () => {
			this.bodyClass = document.body.classList
			this.navMain = document.getElementById('nav-main')
			this.navToggle = document.getElementById('nav-toggle')
			this.navIcons = document.getElementsByClassName('nav-list-container')[0]
			this.colors()

			// Interaction
			this.navToggle.addEventListener('click', this.toggle)
			this.navMain.addEventListener('mouseleave', () => {
				if (this.navIsOpen) { this.toggle() }
			})

			window.onscroll = () => { if (this.navIsOpen) { this.toggle() } }
		})
	}
}






