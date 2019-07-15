/**
 * Michael Hemingway
 * (c) 2019
 */

import Navigation from './components/nav'
import Logger from './components/logger'

const nav = new Navigation()

nav.mount(() => {
	nav.icon()
	nav.colors()
})

const logroot = document.querySelector('.stats')

if (logroot) {
	new Logger(logroot)
}
