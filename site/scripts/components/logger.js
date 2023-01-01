export default class Logger {
  constructor(root) {
    this.root = root
    this.project = root.attributes['data-project'].nodeValue
    this.query = this.makeQuery()

    this.events()
    this.request()
  }

  // truncates the SVG to half the view
  events() {
    window.addEventListener('resize', () => {
      const svg = this.root.querySelector('svg')
      if (svg) {
        if (window.innerWidth < 500) {
          svg.setAttributeNS(null, 'viewBox', '300 0 300 105')
        } else {
          svg.setAttributeNS(null, 'viewBox', '0 0 600 105')
        }
      }
    })
  }

  _date(date) {
    date = date ? date : new Date()

    let str = ''
    str += date.getFullYear()
    str += ('' + date.getMonth()).padStart(2, '0')
    str += '00'

    return str
  }

  _fromSQL(date) {
    if (!date) return new Date()

    date = date.toString()

    return new Date(
      date.substring(0, 4), // year
      Number(date.substring(4, 6)) - 1, // month, zero indexed (???)
      date.substring(6, 8),
    )
  }

  // get most recent records of all activities
  makeQuery() {
    // via Jars codebase
    const YYYYMMDD = date => {
      if (!(date instanceof Date)) date = new Date()
      return date.toLocaleString('fr-ca').replace(/-/g, '').slice(0, 8)
    }

    let now = new Date()
    let start = new Date(now.getFullYear(), now.getMonth() - 6, 0)

    if (this.project === '*') {
      return `&filter=date,bt,${YYYYMMDD(start)},${YYYYMMDD()}`
    } else {
      if (this.project.split(',').length > 1) {
        // more than one term specified (sub projects?), list all
        const queries = this.project.split(',')
        console.log(queries)

        let qs = ``
        for (let i = 1; i < queries.length; i++) {
          qs += `&filter${i}=project,eq,${queries[i]}`
        }
        qs = qs.substring(1, qs.length)

        console.log(qs)
        return `${qs}`
      } else return `filter=project,eq,${this.project}`
    }
  }

  request() {
    const api = 'https://api.arthem.co/jars/v1/records/beans/'
    console.log(`requested:`, `${api}?${this.query}&exclude=ID,task,comment`)
    fetch(`${api}?${this.query}&exclude=ID,task,comment`)
      .then(response => response.json())
      .then(json => this.render(json))
  }

  render(data) {
    // returns distance in days
    const dist = (a, b) => Math.abs(Math.round((a - b) / (1000 * 60 * 60 * 24)))
    const map = (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

    // compute hours total
    let hours = 0

    // construct a single log <rect />
    const day = day => {
      let y = 0
      let x = map(ratio * dist(furthest, this._fromSQL(day.date)), 0, 600, 16, 600)
      let w = ratio * day.hours

      // determine y given svg viewBox height of 105
      switch (day.tod) {
        case 'em':
          y = 10
          break // in the early morning
        case 'm':
          y = 20
          break // in the morning
        case 'md':
          y = 30
          break // around midday
        case 'an':
          y = 40
          break // in the afternoon
        case 'ev':
          y = 50
          break // in the evening
        case 'n':
          y = 60
          break // around nighttime
        case 'ln':
          y = 70
          break // well past sundown
      }

      hours += parseFloat(day.hours) // update total hour count

      return `<rect x="${x}" y="${y}" width="${w}" height="3" rx="1.5" class="${day.category}" data="${[
        day.project,
        day.date,
        day.hours,
        day.tod,
      ].join()}" />`
    }

    const todstrs = ['em', 'm', 'md', 'an', 'ev', 'n', 'ln']

    let svg = ''
    let now = new Date()
    let furthest = new Date(now.getFullYear(), now.getMonth() - 6, 0)
    let ratio = 600 / dist(furthest, new Date())

    // create 'time of day' labels
    for (let i = 0; i < 7; i++) {
      svg += `<text x="0" y="${i * 10 + 15}">${todstrs[i]}</text>`
    }

    // append logs to svg
    data.records.forEach(el => (svg += day(el)))

    const supplementaryData =
      (this.project === '*' ? `since ${furthest.toLocaleDateString()} (~6 months ago)` : 'total') +
      `, ${hours} hours`
    const meta = `Showing logs for <i>${this.project}</i><br>${data.records.length} records ${supplementaryData}`

    this.root.innerHTML =
      `<h3><span class="jars-logo">◐</span> Logs</h3>` +
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 105">${svg}</svg>`

    const p = document.createElement('p')
    p.innerHTML = meta
    this.root.appendChild(p)

    svg = this.root.querySelector('svg')

    svg.querySelectorAll('rect').forEach(el => {
      el.addEventListener('mouseover', e => {
        const d = e.target.attributes.data.value.split(',')
        const info = ` <span class="detail">Highlighted: ${this._fromSQL(d[1]).toLocaleDateString()}, ${
          d[2]
        }hrs on ${d[0]}</span>`
        p.innerHTML = meta + info
      })
    })

    svg.addEventListener('mouseleave', () => {
      setTimeout(() => {
        p.innerHTML = meta
      }, 1000)
    })
  }
}
