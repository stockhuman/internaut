/**
 * Michael Hemingway
 * (c) 2019
 */

import Navigation from './components/nav'
import Logger from './components/logger'
import Settings from './components/settings'

const nav = new Navigation()
const settings = new Settings()

const logroot = document.querySelector('.stats')
if (logroot) new Logger(logroot) // initialises logger

document.addEventListener('DOMContentLoaded', () => {
  settings.mount()
  nav.mount()
  nav.colors()
})

// Class for mouse movement, hides thick border used for tabbing
let mm = () => {
  document.body.classList.add('mn')
  document.removeEventListener('mousemove', mm)
}
document.addEventListener('mousemove', mm)
