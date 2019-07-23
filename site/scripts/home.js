// import {Renderer, Camera, Transform,  Program, Geometry, Mesh, Vec3 } from './lib/ogl/Core.js'
// import ParticlesShader from './lib/ogl/shaders/ParticlesShader.js'
// import { Orbit } from './lib/ogl/Extras.js'

// const renderer = new Renderer({depth: false})
// const gl = renderer.gl

// document.body.appendChild(gl.canvas)
// gl.clearColor(0.5019607, 0.81176470, 0.66274509, 0)

// const camera = new Camera(gl, {fov: 15})
// camera.position.z = 15

// const controls = new Orbit(camera, {
// 	target: new Vec3(0, 0.7, 0),
// })

// function resize() {
// 	renderer.setSize(window.innerWidth, window.innerHeight)
// 	renderer.gl.canvas.style = 'width: 100%; height: 100%;'
// 	camera.perspective({aspect: gl.canvas.width / gl.canvas.height})
// }

// window.addEventListener('resize', resize, false)
// resize()

// requestAnimationFrame(update)

// function update(t) {
// 	requestAnimationFrame(update)
// 	renderer.render({camera})
// 	controls.update()
// }
