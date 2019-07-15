
// via https://blog.crimx.com/2017/03/09/get-all-images-in-dom-including-background-en/
const allImages = doc => {
	return new Promise((resolve, reject) => {
		loadImgAll(Array.from(searchDOM(doc)))
			.then(resolve, reject)
	})

	function searchDOM(doc) {
		const srcChecker = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i
		return Array.from(doc.querySelectorAll('*'))
			.reduce((collection, node) => {
				// bg src
				let prop = window.getComputedStyle(node, null)
					.getPropertyValue('background-image')
				// match `url(...)`
				let match = srcChecker.exec(prop)
				if (match) {
					collection.add(match[1])
				}

				if (/^img$/i.test(node.tagName)) {
					// src from img tag
					collection.add(node.src)
				}
				return collection
			}, new Set())
	}

	function loadImg(src, timeout = 500) {
		const imgPromise = new Promise((resolve, reject) => {
			let img = new Image()
			img.onload = () => {
				resolve({
					src: src,
					elem: img
				})
			}
			img.onerror = reject
			img.src = src
		})
		const timer = new Promise((resolve, reject) => {
			setTimeout(reject, timeout)
		})
		return Promise.race([imgPromise, timer])
	}

	function loadImgAll(imgList, timeout = 500) {
		return new Promise((resolve, reject) => {
			Promise.all(
				imgList
					.map(src => loadImg(src, timeout))
					.map(p => p.catch(e => false))
			).then(results => resolve(results.filter(r => r)))
		})
	}
}

allImages(document).then(list => {
	list.forEach(image => {
		console.log(image)
		image.elem.addEventListener('click', () => {
			// parse image src
			if (image.src.contains('dither-')) {
				image.src = image.src.replace('dither-', '').substring(0, 4)
			}
		})
	})
})


// Smoothstate JQ plugin
		// Alterations to the page
		render: function () {
			// Quickly toggles a class and restarts css animations
			body.toggleClass('is-exiting');
		}
	},
	onAfter: function () {
		navColors(); // color the nav
		resetNav(); // hide the transitioner / close the nav

		body.toggleClass('is-exiting');
	}
