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

// copy (Hi, I'm Michael text)
var copy = document.getElementById('home-canvas-overlay');

// The cool home canvas
if (window.location.pathname == '/') {
	init();
}

// sets up the scene
function init () {
	canvas = document.getElementById('home-canvas');
	canvas.style.width = '100%';

	// set position here so if js fails, it still looks good.
	copy.style.position = 'absolute';
	copy.style.left = canvas.width / 2 + "px";
	copy.style.top = canvas.height / 2 + "px";

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

	const radius = 1;

	if (mx > windowW / 2) {
		camera.rotation.y -= 0.01 * normalize(mx, windowW/2, -windowW/2);
	} else {
		camera.rotation.y += 0.01 * normalize(mx, windowW/2, windowW);
	}

	if (my < windowH / 2) {
		camera.rotation.x -= 0.01 * normalize(my, windowH/2, -windowH/2);
	} else {
		camera.rotation.x += 0.01 * normalize(my, windowH/2, windowH);
	}
	
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
	renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
	renderer.setSize( windowW, windowH );

	// env
	scene.fog = new THREE.Fog(0xffffff, 10, 3000);
	scene.fog.color.setHSL( 0.51, 0.6, 0.6 );
	ambientLight = new THREE.AmbientLight(0xbbbbbb);

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

	var plane = new THREE.PlaneGeometry(400, 400); // HDHJUDHJGDJHDJHDJHDJHDJ

}


// UTILS
// ============================================

function normalize (val, min, max) { return (val - min) / (max - min); }

var mx = null;
var my = null;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
function onMouseUpdate(e) {
	mx = e.pageX;
	my = e.pageY;
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

	copy.style.left = canvas.width / 2 + "px";
	copy.style.top = canvas.height / 2 + "px";

	renderer.setSize( windowW, windowH );
}

}());


// TODO: simple responsiveness @ ultrawide