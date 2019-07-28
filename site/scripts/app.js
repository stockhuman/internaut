/**
 * Michael Hemingway
 * (c) 2019
 */

import Navigation from './components/nav'
import Logger from './components/logger'

import { allImages } from './components/upres'

const nav = new Navigation()
nav.mount(() => nav.colors())

let mm = () => {
	document.body.classList.add('mn')
	document.removeEventListener('mousemove', mm)
}

document.addEventListener('mousemove', mm)

const logroot = document.querySelector('.stats')

if (logroot) {
	new Logger(logroot)
}

const pictures = allImages(document)

// onclick, change out low-res image for hi-res
pictures.forEach(image => {
	image.node.addEventListener('click', () => {
		if (image.src.includes('dither-')) {
			let undithered = image.src.replace('dither-', '').replace('.png', '')
			if (image.type === 'bg') {
				image.node.style.backgroundImage = `url(${undithered})`
				image.node.style.mixBlendMode = 'initial'
			} else {
				image.node.src = undithered
			}
		}
	})
})
