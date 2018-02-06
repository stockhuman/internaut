/**
 * @author Michael Hemingway
 * Mobile Client
 *
 * Concordia University, CART 351. November 2017
 */

(function () {
'use strict'

// Environment
const server = 'https://c351.michaelhemingway.com/projects/tellum/api.php/sounds/'
let isRecord = false
let location = ''
let sndsSent = 0

// UI Variables
const record = document.getElementById('record')
const listen = document.getElementById('listen')

const mainSection = document.querySelector('.main')

// visualiser setup - create web audio api context and canvas
const audioCtx = new (window.AudioContext || webkitAudioContext)()


$(document).ready(function () {
	geolocate()
})

function geolocate () {
	if (navigator.geolocation) {
		// const btn = document.getElementById('consent')
		const meta = document.getElementById('meta')
		let pos;

		let success = position => {
			pos = position
			location = position
			meta.innerHTML = pos.coords.latitude + ' | ' + pos.coords.longitude
			app()
		}

		let error = error => { 
			console.log(error)
		}
		navigator.geolocation.getCurrentPosition(success, error)
	} else {
		console.log('Geolocation is not supported for this Browser/OS.')
	}
}

// Main block for doing the audio recording
function app () {
	if (navigator.mediaDevices.getUserMedia) {
		var constraints = { audio: true }
		var chunks = [];

		const onSuccess = function(stream) {
			var mediaRecorder = new MediaRecorder(stream);
			visualize(stream);

			record.onclick = function () {
				if (!isRecord) {
					mediaRecorder.start();
					record.innerHTML = 'Recording'
				} else {
					mediaRecorder.stop();
					record.innerHTML = 'Record'
				}
				console.log(mediaRecorder.state)
				record.classList.toggle('rec')
				isRecord = !isRecord
			}

			listen.onclick = function () {
				if (sndsSent > 0) {
					fetch()
				}
			}

			// Upload to server
			mediaRecorder.onstop = function(e) {
				var blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
				chunks = [];
				var audioURL = window.URL.createObjectURL(blob);

				console.info(blob.size + ' bytes, or ' + (blob.size / 1000000) + 'mb')

				let dataOut = new FormData();
				let preformattedLoc = {
					lat : location.coords.latitude,
					lon : location.coords.longitude
				}
				let dt = new Date().toISOString().slice(0, 19).replace('T', ' ')

				dataOut.append('meta', JSON.stringify(preformattedLoc))
				dataOut.append('datetime', dt)
				dataOut.append('sound', blob, blob.size + '.wav')

				axios.post(server, dataOut, {
					headers: {'content-type': 'multipart/form-data'}
				}).then(response => {
					console.log(response)
					sndsSent += 1
					$('#listen').show();
				})
				.catch(error => {console.warn(error)})
			}

			mediaRecorder.ondataavailable = function(e) {
				chunks.push(e.data)
			}
		}

		const onError = function(err) {
			console.log('The following error occured: ' + err)
		}

		navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError)
	} else {
		console.warn('getUserMedia not supported on your browser!')
	}
}

function visualize (stream) {

	const canvas = document.getElementById('visualizer')
	const ctx = canvas.getContext("2d")
	const mobile = /Mobi/.test(navigator.userAgent)

	// Global Animation Setting
	window.requestAnimFrame = 
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000/60);
	};

	const scale = window.devicePixelRatio

	canvas.width  = scale * window.innerWidth
	canvas.height = scale * window.innerHeight

	canvas.style.width  = window.innerWidth  + "px"
	canvas.style.height = window.innerHeight + "px"

	const WIDTH = window.innerWidth
	const HEIGHT = window.innerHeight

	ctx.scale(scale, scale)

	// // Particles Around the Parent
	function Particle(x, y, distance) {
		this.angle = Math.random() * 2 * Math.PI;
		this.radius = Math.random();
		this.opacity =  (Math.random() * 5 + 2)/10;
		this.distance = (1/this.opacity) * distance;
		this.speed = this.distance * 0.00003;
		this.position = {
			x: x + this.distance * Math.cos(this.angle),
			y: y + this.distance * Math.sin(this.angle)
		};
		
		this.draw = function() {
			ctx.fillStyle = isRecord ? 
				'rgba(249,220,92,' + this.opacity + ')':
				'rgba(244,255,253,' + this.opacity + ')';
			ctx.beginPath();
			ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, false);
			ctx.fill();
			ctx.closePath();
		}
		this.update = function() {
			this.angle += this.speed; 
			this.position = {
				x: x + this.distance * Math.cos(this.angle),
				y: y + this.distance * Math.sin(this.angle)
			};
			this.draw();
		}
	}

	function Emitter(x, y) {
		this.position = { x: x, y: y };
		this.radius = 60;
		if (mobile) {
			this.count = 100;
		} else {
			this.count = 2000; // was 3000
		}
		
		this.particles = [];
		
		for (let i = 0; i < this.count; i++ ) {
			this.particles.push(
				new Particle(
					this.position.x,
					this.position.y,
					this.radius
				)
			);
		}
	}

	Emitter.prototype = {
		update: function () {
			for (let i = 0; i < this.count; i++) {
				this.particles[i].update()
			}
		}
	}

	var emitter = new Emitter(WIDTH/2, HEIGHT/2);
	var source = audioCtx.createMediaStreamSource(stream);
	var analyser = audioCtx.createAnalyser();
			analyser.fftSize = 512;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	source.connect(analyser);

	function loop() {
		
		analyser.getByteTimeDomainData(dataArray);

		ctx.fillStyle = '#011936';
		ctx.fillRect(0, 0, WIDTH, HEIGHT);

		ctx.lineWidth = 2;
		ctx.strokeStyle = isRecord ? '#ED254E' : '#F4FFFD';

		ctx.beginPath();

		const sliceWidth = WIDTH * 1.0 / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {

			var v = dataArray[i] / 128.0;
			var y = v * HEIGHT/4 + HEIGHT/4;

			if (i === 0) {
				ctx.moveTo(x, y);
			} else {
				ctx.lineTo(x, y);
			}
			x += sliceWidth;
		}

		ctx.lineTo(canvas.width, canvas.height/2);
		ctx.stroke();
		emitter.update();
		requestAnimFrame(loop);
	}

	loop();
}

function fetch () {

	let base64audio = 'data:'
	let randomAudio = 0

	const dataURItoBlob = function (dataURI) {
		// Split the input to get the mime-type and the data itself
		dataURI = dataURI.split( ',' );

		// First part contains data:audio/ogg;base64 from which we only need audio/ogg
		var type = dataURI[ 0 ].split( ':' )[ 1 ].split( ';' )[ 0 ];

		// Second part is the data itself and we decode it
		var byteString = atob( dataURI[ 1 ] );
		var byteStringLen = byteString.length;

		// Create ArrayBuffer with the byte string and set the length to it
		var ab = new ArrayBuffer( byteStringLen );

		// Create a typed array out of the array buffer representing each character from as a 8-bit unsigned integer
		var intArray = new Uint8Array( ab );
		for ( var i = 0; i < byteStringLen; i++ ) {
			intArray[ i ] = byteString.charCodeAt( i );
		}

		return new Blob( [ intArray ], {type: type} );
	}

	// fetch the current audio IDs on the server
	axios.get(server + '?columns=id').then(response => {

		// retrieve entire list
		let all = response.data.sounds.records
		let selected = all[0][0]

		if (all.length < 0) {
			// fail
		} else if (all.length === 1) {
			// there is only one sound on the server
		} else {
			selected = all[Math.floor(Math.random() * all.length)][0]
		}
		console.log('playing audio ID: ' + selected)

		// get the selected audio
		axios.get(server + selected).then(response => {
			base64audio += response.data.sound_type + ';base64,' + response.data.sound;
			// $('#source').text('Source: ' + base64audio);

			let audio = document.createElement('audio');
			let audioURL = URL.createObjectURL(dataURItoBlob(base64audio));

			audio.src = audioURL
			audio.load()
			audio.autoplay = true
		})
	})


	sndsSent -= 1
}

}());

/**
 * @author Michael Hemingway
 * Navigation
 *
 * 
 */
// (function ($) {
// 	'use strict'

// 	const overlayNav = $('.overlay-nav')
// 	const	overlayContent = $('.overlay-content')
// 	const toggleNav = $('.nav-trigger')
// 	const navigation = $('.primary-nav')
	 
// 	toggleNav.on('click', function(){
// 		if(!toggleNav.hasClass('close-nav')) {
// 			// navigation is not visible yet
// 		} else {
// 			// animate cross icon into a menu icon
// 			toggleNav.removeClass('close-nav');
// 			// animate the content layer
// 			overlayContent.children('span').animate({
// 				translateZ: 0,
// 				scaleX: 1,
// 				scaleY: 1,
// 			}, 500, 'easeInCubic', function(){
// 				//hide navigation
// 				navigation.removeClass('fade-in');
// 				//scale to zero the navigation layer
// 				overlayNav.children('span').animate({
// 					translateZ: 0,
// 					scaleX: 0,
// 					scaleY: 0,
// 				}, 0);
// 				//reduce to opacity of the content layer with the is-hidden class
// 				overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
// 					//wait for the end of the transition and scale to zero the content layer
// 					overlayContent.children('span').animate({
// 						translateZ: 0,
// 						scaleX: 0,
// 						scaleY: 0,
// 					}, 0, function(){overlayContent.removeClass('is-hidden')});
	 
// 				});
// 			});
// 		}
// 	});


// }(jQuery)); 
