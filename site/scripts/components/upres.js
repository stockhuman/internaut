
// via https://blog.crimx.com/2017/03/09/get-all-images-in-dom-including-background-en/
export const allImages = doc => searchDOM(doc)


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
				collection.add({node, type: 'bg', src: match[1]})
			}

			if (/^img$/i.test(node.tagName)) {
				// src from img tag
				collection.add({node, type: 'img', src: node.src})
			}
			return collection
		}, new Set())
}
