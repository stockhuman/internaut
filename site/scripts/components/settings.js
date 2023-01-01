import { allImages } from './upres'

export default class Settings {
  constructor() {
    this.theme = localStorage.getItem('theme')
    this.dithered = localStorage.getItem('dithered')
    this.pictures = allImages(document)

    // via https://web.dev/prefers-color-scheme/
    if (!this.theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localStorage.setItem('theme', 'dark')
        this.theme = 'dark'
      } else {
        localStorage.setItem('theme', 'light')
        this.theme = 'light'
      }
    }

    if (!this.dithered) localStorage.setItem('dithered', false)

    this.mount = this.mount.bind(this)
    this.test = this.test.bind(this)
    this.toggleDarkTheme = this.toggleDarkTheme.bind(this)
    this.toggleColor = this.toggleColor.bind(this)
  }

  mount() {
    this.tglTheme = document.getElementById('tgl-dark-mode')
    this.tglDither = document.getElementById('tgl-full-color')
    this.tglTheme.addEventListener('change', this.toggleDarkTheme)
    this.tglDither.addEventListener('change', this.toggleColor)

    this.tglTheme.checked = this.theme === 'light' ? false : true
    this.tglDither.checked = this.dithered === 'true' ? true : false

    this.test()
  }

  test() {
    if (this.dithered == 'true') {
      this.pictures.forEach(image => this.undither(image))
    } else {
      // onclick, change out low-res image for hi-res
      this.pictures.forEach(image => {
        image.node.addEventListener('click', () => {
          this.undither(image)
        })
      })
    }

    if (this.theme == 'dark') {
      document.documentElement.classList.add('dark-theme')
    } else {
      document.documentElement.classList.remove('dark-theme')
    }
  }

  toggleColor() {
    if (this.tglDither.checked) {
      localStorage.setItem('dithered', true)
      this.pictures.forEach(image => this.undither(image))
    } else {
      localStorage.setItem('dithered', false)
    }
  }

  toggleDarkTheme() {
    if (this.tglTheme.checked) {
      localStorage.setItem('theme', 'dark')
      document.documentElement.classList.add('dark-theme')
    } else {
      localStorage.setItem('theme', 'light')
      document.documentElement.classList.remove('dark-theme')
    }
  }

  undither(image) {
    if (image.src.includes('dither-')) {
      let undithered = image.src.replace('dither-', '').replace('.png', '')
      if (image.type === 'bg') {
        image.node.style.backgroundImage = `url(${undithered})`
        image.node.style.mixBlendMode = 'initial'
      } else {
        image.node.src = undithered
      }
    }
  }
}
