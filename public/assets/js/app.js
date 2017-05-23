/**
 * The fluff elements, UI pizzaz.
 */

(function($) {
	'use strict';

	// avoid deprecated synchronous call (http://stackoverflow.com/questions/24639335/)
	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) { options.async = true; });

	var bg, accent;

	function navColors() {
		if ($('article.page').attr('data-base') != (undefined)) {
			bg = $('article.page').attr('data-base');
			accent = $('article.page').attr('data-highlight');
		} else {
			bg = '#3b444c';
			accent = '#fff';
		}

		$('#nav-main').css('background', bg);
		$('#transitioner').css('background', bg);
		$('#nav-main').css('color', accent);

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
	$(document).ready(function() {
		navColors();
	});

	/**
	* smoothState
	*/
	$('#container').smoothState({
		blacklist: '.no-smoothState',
		onStart : {
			duration: 450,
			// Alterations to the page
			render: function () {
				// Quickly toggles a class and restarts css animations
				$('body').toggleClass('is-exiting');
			}
		},

		onAfter: function () {
			navColors();
			resetNav();
			if ((window.location.href.indexOf("collection") > -1)) {
				$('body').addClass('collection');
			} else {
				$('body').removeClass('collection');
			}
			$('body').toggleClass('is-exiting');
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

	// load in low res images and blur up
	window.addEventListener('load', fucntion () {
		lazyLoad ();
	});

	function lazyLoad () {
		var lazyImages = document.querySelectorAll('.lazy-img');

		lazyImages.forEach(function(image) {
			let imgUrl = image.getAttribute('data-img-full'),
					imgTag = image.querySelector('img');

			// begin loading the new high res image
			imgTag.src = imgUrl;

			// Once the image is loaded, swap out
			imgTag.addEventListener('load', function () {
				// swap out with the fully downloaded hi-res pic
				image.style.backgroundImage = 'url(' + imgUrl + ')';
				image.classList.add('lazy-loaded');
			});

		});
	}

}(jQuery));

/**
 * @author Michael Hemingway
 * 
 * Implements a lot of knowledge gained from the fine folks at webglfundamentals.org,
 * And MrDoob's brilliance in THREE js
 */
(function () {

// global canvas and webGL context
var canvas, gl;

// THREE js vars
var scene, camera, renderer;
var ambientLight;

// environment variables
var windowW = window.innerWidth;
var windowH = window.innerHeight;
var mx = 0;
var my = 0;
var mX, mY; // computed half-mouse

var initialDeviceOrientation;

// copy (Hi, I'm Michael text)
var copy = document.getElementById('home-canvas-overlay');


// sets up the scene
function init () {
	canvas = document.getElementById('home-canvas');
	canvas.style.width = '100%';

	// set position here so if js fails, it still looks good.
	copy.style.position = 'absolute';

	// Try to grab the standard context. If it fails, fallback to experimental.
	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

	// If we don't have a GL context, give up now
	if (!gl) {
		console.warn('Unable to initialize WebGL. Your browser may not support it.');
		return;
	}

	build(); // adds particles, meshes and sets up all of THREE.js

	// DJ spin that shit
	window.requestAnimationFrame(render);
}

// ...And renders it
function render () {

	update();

	renderer.render(scene, camera);
	window.requestAnimationFrame(render);
}

// THREE JS
// =========================================

function update () {


	
	camera.updateMatrix();

	// rotate the copy with the surrounding elements
	copy.style.transform = 
			"rotateX(" +       camera.rotation.x
			+"rad) rotateY(" + camera.rotation.y
			+"rad) translate3D(-50%, -50%, 0)";

}

function build () {

	// set up three js
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, windowW / windowH, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: false } );

	renderer.setSize( windowW, windowH );
	// renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
	copy.style.left = canvas.width / 2 + "px";
	copy.style.top = canvas.height / 2 + "px";

	// geometry
	buildShapes();
	buildParticles();

	// camera
	camera.position.z = 10;
}

function buildParticles () {
	// create the particle variables
	var particleCount = 420,
			particles = new THREE.Geometry(),
			pMaterial = new THREE.PointsMaterial({ color: 0x000000, size: 1 });
	
	for(var p = 0; p < particleCount; p++) {
	
		var pX = (Math.random() - 0.5) * 1000;
				pY = (Math.random() - 0.5) * 1000;
				pZ = (Math.random() - 0.5) * 1000;
				particle = new THREE.Vector3(pX, pY, pZ);

		particles.vertices.push(particle);
	}
	
	var particleSystem = new THREE.Points( particles, pMaterial);
	scene.add(particleSystem);
}

function buildShapes () {

	const numIcosahedrons = 15;
	var geometry = new THREE.IcosahedronGeometry(15, 1),
			material = new THREE.MeshBasicMaterial( { color: 0xb4f0e3, wireframe: true } );

	for (var i = numIcosahedrons - 1; i >= 0; i--) {

		var mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 1000;
		mesh.position.y = (Math.random() - 0.5) * 1000;
		mesh.position.z = (Math.random() - 0.5) * 1000;

		mesh.updateMatrix();

		mesh.matrixAutoUpdate = false;
		scene.add( mesh );
	}

	// me
	var planegeo = new THREE.PlaneGeometry(512, 512);
	var planetex = new THREE.TextureLoader().load('/assets/img/ui/me.jpg');
	var planemat = new THREE.MeshBasicMaterial( {map: planetex } );
	var plane = new THREE.Mesh(planegeo, planemat);
	plane.position.z = -990;
	plane.position.y = 400;
	scene.add(plane);
}

// UTILS
// ============================================

function normalize (val, min, max) { return (val - min) / (max - min); }

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
function onMouseUpdate(e) {
	mx = e.pageX;
	my = e.pageY;

	mX = mx - windowW;
	mY = my - windowH;
}

function getMouseX() { return x; }
function getMouseY() { return y; }

// Via Shawn Whinnery, stackoverflow.com/questions/20290402/
window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
	windowW = window.innerWidth;
	windowH = window.innerHeight;

	camera.aspect = windowW / windowH;
	camera.updateProjectionMatrix();

	copy.style.left = windowW / 2 + "px";
	copy.style.top =  windowH / 2 + "px";

	renderer.setSize( windowW, windowH );
}

window.addEventListener("devicemotion", handleMotion, true);
function handleMotion() {
	// var betaTilt = initialDeviceOrientation.beta - window.deviceOrientation.beta;
	// var gammaTilt = initialDeviceOrientation.gamma - window.deviceOrientation.gamma;

	// if (gammaTilt < 45 && gammaTilt > -45) {
	// 	camera.position.x += (gammaTilt * 4 - camera.position.x) * 0.1;
	// }

	// if (betaTilt < 45 && betaTilt > -45) {
	// 	camera.position.y += (betaTilt * 4 - camera.position.y + camera.targetPoint.y) * 0.1;
	// }
}

// window.addEventListener("orientationchange", function() {
//     alert("the orientation of the device is now " + screen.orientation.angle);
// });

// GO!
init();

}());

// TODO: simple responsiveness @ ultrawide
/**
 * Michael Hemingway
 * (c) 2017
 *
 *
 */


(function () {
	'use strict';

	// add console text
	window.addEventListener("load", function (event) {
		var c = 'color: #bada55; background: #222;';
		console.log('%c ( ͠° ͟ʖ ͡°)', c);
		console.log('%c Nothing to see here.', c);
	});

}());

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
		// nav is open, close it
		if (bodyClass.contains('nav-is-open')) {
			navIsOpen = false;
			bodyClass.remove('nav-is-open');
		} else {
			navIsOpen = true;
			bodyClass.add('nav-is-open');
		}
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
	
(function ($) {
	'use strict';

	var url = document.URL, 
			sort = '*';


	// the projects page
	$('.isotope').isotope({
		itemSelector: '.item',
		columnWidth: '.project',
		percentPosition: true
	});

}(jQuery));
