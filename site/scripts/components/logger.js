
export default class Logger {
	constructor (root) {
		this.root = root
		this.project = root.attributes['data-project'].nodeValue
		this.query = this.makeQuery()


		this.request()
	}

	_date (date) {
		date = date ? date : new Date()

		let str = ''
		str += date.getFullYear()
		str += ('' + date.getMonth()).padStart(2, '0')
		str += '00'

		return str
	}

	_fromSQL(date) {
		if (!date) return new Date()

		date = String(date)

		return new Date(
			date.substring(0, 4), // year
			Number(date.substring(5, 6)) - 1, // month, zero indexed (???)
			date.substring(7)
		)
	}

	makeQuery() {
		// get most recent records of all activities
		if (this.project === '*') {
			return `date,gt,${this._date()}`
		} else {
			return `project,eq,${this.project}`
		}
	}

	request () {
		const api = 'https://api.arthem.co/jars/v1/records/beans/'
		fetch(`${api}?filter=${this.query}&exclude=ID,task,comment`)
			.then(response => response.json())
			.then(json => this.render(json))
	}


	render (data) {
		// returns distance in days
		const dist = (a, b) => Math.abs(Math.round(((a - b) / (1000 * 60 * 60 * 24))))

		// construct a single log <rect />
		const day = day => {
			let y = 0
			let x = ratio * dist(furthest, this._fromSQL(day.date))
			let w = ratio * day.hours

			// determine y given svg viewBox height of 105
			switch (day.tod) {
				case 'em': y = 10; break // in the early morning
				case 'm': y = 20; break // in the morning
				case 'md': y = 30; break // around midday
				case 'an': y = 40; break // in the afternoon
				case 'ev': y = 50; break // in the evening
				case 'n': y = 60; break // around nighttime
				case 'ln': y = 70; break // well past sundown
			}

			return `<rect x="${x}" y="${y}" width="${w}" height="3" rx="1.5" class="${day.category}"/>`
		}

		const todstrs = ['em','m','md','an','ev','n','ln']

		let svg = ''
		let fmonth = new Date().getMonth()
		let furthest = new Date(new Date().getFullYear(), fmonth - 2)


		let ratio = 600 / dist(furthest, new Date())

		// create 'time of day' labels
		for (let i = 0; i < 7; i++) {
			svg += `<text x="0" y="${i * 10 + 15}">${todstrs[i]}</text>`
		}

		// append logs to svg
		data.records.forEach(el => svg += day(el))

		// discover modal time of day
		// via https://stackoverflow.com/questions/52898456/
		const mode = a => {
			return Object.values(
				a.reduce((count, e) => {
					if (!(e in count)) count[e] = [0, e]
					count[e][0]++
					return count
				}, {})
			).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1]
		}

		// most commonly entered time of day for work
		const modalTod = document.createElement('p')
		modalTod.innerHTML =
			`Scale: 2 Months. Mode: ${mode(data.records.map(item => item.tod))}. Showing logs for '${this.project}'`

		this.root.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 105">${svg}</svg>`
		this.root.appendChild(modalTod)
	}
}
