// setup
const canvas = document.body.appendChild(
	document.createElement("canvas")
)
const context = canvas.getContext("2d")

window.addEventListener('resize', size)
document.addEventListener('mousedown', draw)
size()

// use these alignment properties for "better" positioning
context.textAlign = "center";
context.textBaseline = "middle";
// draw the emoji


setInterval(() => {
	draw({
		pageX: Math.random() * window.innerWidth,
		pageY: Math.random() * document.documentElement.scrollHeight
	})
}, 1300 * Math.random() + 100);

function draw (e) {
	let emoji = ['😜','😂','😍']
	let d = emoji[Math.floor(Math.random() * emoji.length)]

	context.font = Math.random() * 100 + 'px serif'
	context.fillText(d, e.pageX, e.pageY)
}

function size () {
	canvas.width = window.innerWidth
	canvas.height = document.documentElement.scrollHeight

	canvas.style.height = '100%'
	canvas.style.width = '100%'
}
