// Implements the navigation bar and related animation

export default class Navigation {
  constructor() {
    this.navToggle = null
    this.bodyClass = null
    this.navIcons = null
    this.navIsOpen = false
    this.navMain = null

    this.mount = this.mount.bind(this)
    this.toggle = this.toggle.bind(this)
    this.reset = this.reset.bind(this)
    this.colors = this.colors.bind(this)
  }

  reset() {
    if (this.navIsOpen) {
      this.navIsOpen = false
      this.bodyClass.remove('nav-is-open')
    }
  }

  toggle() {
    // nav is open, close it
    if (this.bodyClass.contains('nav-is-open')) {
      this.navIsOpen = false
      this.bodyClass.remove('nav-is-open')

      // nav is closed, open it
    } else {
      this.navIsOpen = true
      this.bodyClass.add('nav-is-open')
    }
  }

  colors() {
    let page = document.querySelector('article.page'),
      bg,
      fg

    if (page && page.attributes) {
      let p = page.attributes
      bg = p['data-base'] ? '#' + p['data-base'].value : '#292F35'
      fg = p['data-highlight'] ? '#' + p['data-highlight'].value : '#fff'
    } else {
      bg = '#292F35'
      fg = '#fff'
    }

    this.navMain.style.background = bg
    this.navMain.style.color = fg
    // 	$('#transitioner').css('background', bg);

    document.querySelectorAll('#nav-toggle span').forEach(item => {
      item.style.color = fg // ?
    })
  }

  mount() {
    this.bodyClass = document.body.classList
    this.navMain = document.getElementById('nav-main')
    this.navToggle = document.getElementById('nav-toggle')
    this.navIcons = document.getElementsByClassName('nav-list-container')[0]
    this.colors()

    // Interaction
    this.navToggle.addEventListener('click', this.toggle)
    this.navIcons.addEventListener('click', e => {
      if (!this.navIsOpen && e.explicitOriginalTarget === this.navIcons) {
        this.toggle()
      }
    })
    this.navMain.addEventListener('mouseleave', () => {
      if (this.navIsOpen) {
        this.toggle()
      }
    })

    window.onscroll = () => {
      if (this.navIsOpen) {
        this.toggle()
      }
    }
  }
}
