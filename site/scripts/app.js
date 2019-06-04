/**
 * Michael Hemingway
 * (c) 2019
 */

import Navigation from './nav'

const nav = new Navigation()

//  // SMOOTHSTATE
//  var body = $('body')
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
// });

// // add nav links to smoothState
// $(".nav-list-item a, #nav-home-icon a").click(function(e) {
// 	e.preventDefault();
// 	var c = $("#container").smoothState().data("smoothState"),
// 			l = $(this).attr("href");
// 	c.load(l);
// });

// // MISC_____________________________________

// // add console text
// window.addEventListener("load", function (event) {
// 	var c = 'color: #bada55;';
// 	console.log('%c ( ͠° ͟ʖ ͡°)', c);
// 	console.log('%c Nothing to see here.', c);
// });

// // Me_______________________________________

// // Environment

// // via https://stackoverflow.com/a/26191207/6929333
// var width = getWidth()

// // var canvas = document.getElementById('home-canvas')

// var scene = new THREE.Scene();
// var aspect = width / window.innerHeight;
// var camera = new THREE.PerspectiveCamera( 45, aspect, 1, 2000 );
// // var renderer = new THREE.WebGLRenderer( { canvas: canvas, alpha: true } );
// var renderer = new THREE.WebGLRenderer( { alpha: true } );
// var me;

// // Setup
// var init = function () {

// 	// Renderer
// 	renderer.setPixelRatio(window.devicePixelRatio > 1 ? window.devicePixelRatio : 1);
// 	renderer.setSize( width, window.innerHeight );
// 	renderer.domElement.id = 'home-canvas';
// 	document.body.appendChild( renderer.domElement );

// 	camera.position.z = 5;

// 	// Geometry
// 	var loader = new THREE.JSONLoader();

// 	loader.load( '/assets/js/me.json', function ( geometry ) {
// 		// var geo = new THREE.WireframeGeometry( geometry );
// 		var material = new THREE.MeshNormalMaterial( { wireframe: true, wireframeLinewidth: 5 } );
// 		// var mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
// 		me = new THREE.Mesh( geometry, material );
// 		scene.add( me );
// 		me.position.y = -2;
// 		me.position.z = -3;
// 	});

// 	// Events
// 	window.addEventListener( 'resize', onWindowResize, false );
// 	if (document.getElementById('home')) {
// 		console.log('test!')
// 		document.getElementById('home-canvas').style.opacity = 1;
// 	} else {
// 		document.getElementById('home-canvas').style.opacity = 0.2;
// 	}
// }


// function render () {
// 	if (me != undefined) me.rotation.y += 0.001;
// 	camera.lookAt( scene.position );
// 	renderer.render( scene, camera );
// }

// function animate () {
// 	requestAnimationFrame( animate );
// 	render();
// }

// function onWindowResize () {
// 	width = getWidth();
// 	camera.aspect = width / window.innerHeight;
// 	camera.updateProjectionMatrix();
// 	renderer.setSize( width, window.innerHeight );
// }

// function getWidth () {
// 	return window.innerWidth && document.documentElement.clientWidth ?
// 	Math.min(window.innerWidth, document.documentElement.clientWidth) :
// 	window.innerWidth ||
// 	document.documentElement.clientWidth ||
// 	document.getElementsByTagName('body')[0].clientWidth;
// }

// init();
// animate();

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
