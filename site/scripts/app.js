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
		$.readyFn.execute();
		navColors(); // color the nav
		resetNav(); // hide the transitioner / close the nav


		if (window.location.origin == window.location.href) {
			document.getElementById('home-canvas').style.opacity = 1;
		} else {
			document.getElementById('home-canvas').style.opacity = 0.2;
		}

		// fix collection styling
		if ((window.location.href.indexOf("collection") > -1)) {
			body.addClass('collection');
		} else { body.removeClass('collection'); }

		body.toggleClass('is-exiting');
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
	var c = 'color: #bada55;';
	console.log('%c ( ͠° ͟ʖ ͡°)', c);
	console.log('%c Nothing to see here.', c);
});

// Me_______________________________________

// Environment

// via https://stackoverflow.com/a/26191207/6929333
var width = getWidth()

// var canvas = document.getElementById('home-canvas')

var scene = new THREE.Scene();
var aspect = width / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 45, aspect, 1, 2000 );
// var renderer = new THREE.WebGLRenderer( { canvas: canvas, alpha: true } );
var renderer = new THREE.WebGLRenderer( { alpha: true } );
var me;

// Setup
var init = function () {

	// Renderer
	renderer.setPixelRatio(window.devicePixelRatio > 1 ? window.devicePixelRatio : 1);
	renderer.setSize( width, window.innerHeight );
	renderer.domElement.id = 'home-canvas';
	document.body.appendChild( renderer.domElement );

	camera.position.z = 5;

	// Geometry
	var loader = new THREE.JSONLoader();

	loader.load( '/assets/js/me.json', function ( geometry ) {
		// var geo = new THREE.WireframeGeometry( geometry );
		var material = new THREE.MeshNormalMaterial( { wireframe: true, wireframeLinewidth: 5 } );
		// var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
		me = new THREE.Mesh( geometry, material );
		scene.add( me );
		me.position.y = -2;
		me.position.z = -3;
	});

	// Events
	window.addEventListener( 'resize', onWindowResize, false );
	if (document.getElementById('home')) {
		console.log('test!')
		document.getElementById('home-canvas').style.opacity = 1;
	} else {
		document.getElementById('home-canvas').style.opacity = 0.2;
	}
}


function render () {
	if (me != undefined) me.rotation.y += 0.001;
	camera.lookAt( scene.position );
	renderer.render( scene, camera );
}

function animate () {
	requestAnimationFrame( animate );
	render();
}

function onWindowResize () {
	width = getWidth();
	camera.aspect = width / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( width, window.innerHeight );
}

function getWidth () {
	return window.innerWidth && document.documentElement.clientWidth ?
	Math.min(window.innerWidth, document.documentElement.clientWidth) :
	window.innerWidth ||
	document.documentElement.clientWidth ||
	document.getElementsByTagName('body')[0].clientWidth;
}

init();
animate();

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


// the projects page
$(document).ready(function () {
	var filterBtnGroup = $('#project-filters a');

	var projects = $('.isotope').isotope({
		itemSelector: '.item',
		columnWidth: '.project',
		percentPosition: true
	});

	// filter the isotope layout
	filterBtnGroup.on('click', function (e) {
		e.preventDefault();
		var filterVal = $(this).attr('data-filter');
		projects.isotope({filter: filterVal});
	});

	projects.imagesLoaded().progress( function() {
	  projects.isotope('layout');
	});
});
