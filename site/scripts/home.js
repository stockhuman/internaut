// setup
const canvas = document.body.appendChild(
	document.createElement("canvas")
)
const context = canvas.getContext("2d")

window.addEventListener('resize', size)
document.addEventListener('click', size)
size()

// use these alignment properties for "better" positioning
context.textAlign = "center";
context.textBaseline = "middle";
context.font = 20 + Math.random() * 100 + 'px serif'
setTimeout(() => { context.fillText('😍', window.innerWidth/2, 200)}, 400)

// give some time to read intro copy
setTimeout(() => {
	setInterval(() => {
		draw({
			pageX: Math.random() * window.innerWidth,
			pageY: Math.random() * document.documentElement.scrollHeight
		})
	}, 1300 * Math.random() + 100);
}, 2000);

// draw the emoji
function draw (e) {
	let emoji = ['😜','😂','😍']
	let d = emoji[Math.floor(Math.random() * emoji.length)]
	context.rotate(Math.PI / Math.random())
	context.font = 6 + Math.random() * 100 + 'px serif'
	context.fillText(d, e.pageX, e.pageY)
}

// resize canvas
function size () {
	canvas.width = window.innerWidth
	canvas.height = document.documentElement.scrollHeight

	canvas.style.height = '100%'
	canvas.style.width = '100%'
}
