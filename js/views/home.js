/**
 * @author Michael Hemingway
 * 
 */

// $(document).ready(function () {
// 	if ($('#home-canvas')) {

// 		/**
// 		 * **************************************************************************
// 		 * utils
// 		 * **************************************************************************
// 		 */
		
// 		// from https://gist.github.com/desandro/1866474
// 		var lastTime = 0;
// 		var prefixes = 'webkit moz ms o'.split(' ');
// 		// get unprefixed rAF and cAF, if present
// 		var requestAnimationFrame = window.requestAnimationFrame;
// 		var cancelAnimationFrame = window.cancelAnimationFrame;
// 		// loop through vendor prefixes and get prefixed rAF and cAF
// 		var prefix;
// 		for( var i = 0; i < prefixes.length; i++ ) {
// 			if ( requestAnimationFrame && cancelAnimationFrame ) {
// 				break;
// 			}
// 			prefix = prefixes[i];
// 			requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
// 			cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
// 			window[ prefix + 'CancelRequestAnimationFrame' ];
// 		}

// 		// fallback to setTimeout and clearTimeout if either request/cancel is not supported
// 		if ( !requestAnimationFrame || !cancelAnimationFrame ) {
// 			requestAnimationFrame = function( callback, element ) {
// 				var currTime = new Date().getTime();
// 				var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
// 				var id = window.setTimeout( function() {
// 					callback( currTime + timeToCall );
// 				}, timeToCall );
// 				lastTime = currTime + timeToCall;
// 				return id;
// 			};

// 			cancelAnimationFrame = function( id ) {
// 				window.clearTimeout( id );
// 			};
// 		}

// 		function extend( a, b ) {
// 			for( var key in b ) { 
// 				if( b.hasOwnProperty( key ) ) {
// 					a[key] = b[key];
// 				}
// 			}
// 			return a;
// 		}

// 		// from http://www.quirksmode.org/js/events_properties.html#position
// 		function getMousePos(e) {
// 			var posx = 0;
// 			var posy = 0;
// 			if (!e) var e = window.event;
// 			if (e.pageX || e.pageY) 	{
// 				posx = e.pageX;
// 				posy = e.pageY;
// 			}
// 			else if (e.clientX || e.clientY) 	{
// 				posx = e.clientX + document.body.scrollLeft
// 					+ document.documentElement.scrollLeft;
// 				posy = e.clientY + document.body.scrollTop
// 					+ document.documentElement.scrollTop;
// 			}
// 			return {
// 				x : posx,
// 				y : posy
// 			}
// 		}

// 		// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
// 		function throttle(fn, delay) {
// 			var allowSample = true;

// 			return function(e) {
// 				if (allowSample) {
// 					allowSample = false;
// 					setTimeout(function() { allowSample = true; }, delay);
// 					fn(e);
// 				}
// 			};
// 		}

// 		/**
// 		 * **************************************************************************
// 		 * The Hero
// 		 * **************************************************************************
// 		 */

// 		var canvas = $('#home-canvas')[0],
// 				ctx = canvas.getContext('2d'),
// 				overlay = $('#home-canvas-overlay')[0];

// 		if (window.devicePixelRatio) {
// 		    var canvasWidth = $(canvas).attr('width');
// 		    var canvasHeight = $(canvas).attr('height');
// 		    var canvasCssWidth = canvasWidth;
// 		    var canvasCssHeight = canvasHeight;

// 		    $(canvas).attr('width', canvasWidth * window.devicePixelRatio);
// 		    $(canvas).attr('height', canvasHeight * window.devicePixelRatio);
// 		    $(canvas).css('width', canvasCssWidth);
// 		    $(canvas).css('height', canvasCssHeight);
// 		    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
// 		}

// 		document.addEventListener('mousemove', function(ev) {
// 			// window.requestAnimationFrame(function() {

// 				// mouse position relative to the document.
// 				var mousepos = getMousePos(ev),
// 					// document scrolls.
// 					docScrolls = {
// 						left : document.body.scrollLeft + document.documentElement.scrollLeft,
// 						top : document.body.scrollTop + document.documentElement.scrollTop
// 					},
// 					bounds = canvas.getBoundingClientRect(),
// 					// mouse position relative to the main element (tiltWrapper).
// 					relmousepos = {
// 						x : mousepos.x - bounds.left - docScrolls.left,
// 						y : mousepos.y - bounds.top - docScrolls.top
// 					},

// 				rotX = overlay.height * relmousepos.y,
// 				rotY = overlay.width  * relmousepos.x,
// 				rotZ = overlay.width  * relmousepos.x,
// 				transX = 2 * relmousepos.x,
// 				transY = 2 * relmousepos.y,
// 				transZ = 2 * relmousepos.y;

// 			overlay.style =
// 				' translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px)' +
// 				' rotate3d(1,0,0,' + rotX + 'deg)' +
// 				' rotate3d(0,1,0,' + rotY + 'deg)' +
// 				' rotate3d(0,0,1,' + rotZ + 'deg)';
// 			// }
// 		});

// 	}
// });