/**
 * @author Michael Hemingway
 * Desktop Client
 *
 * Concordia University, CART 351. November 2017
 */

(function ($) {
	'use strict'

	mapboxgl.accessToken = 'pk.eyJ1Ijoic3RvY2todW1hbiIsImEiOiJjamE4dWxyZTUwMG9zMnFzNDFucHF0ZzdyIn0.DpVSsrPakJynuKVNifh7uA';
	
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/stockhuman/cja8w6mus0yvc2sqazwtisw9p',
		// center: [, ],
		center: [-73.5878100, 45.5088400],
		zoom: 10
	})

	// disable map rotation using right click + drag
	map.dragRotate.disable();

	// disable map rotation using touch rotation gesture
	map.touchZoomRotate.disableRotation();

	const server = 'https://c351.michaelhemingway.com/projects/tellum/api.php/sounds/'
	let nodes = []

	$(document).ready(function () {

		// fetch meta for the first time
		axios.get(server + '?columns=id,meta,datetime,sound_size')
		.then(response => {
			let tmp = response.data.sounds.records

			for (let i = tmp.length - 1; i >= 0; i--) {
				tmp[i] = {
					id: tmp[i][0],
					loc: JSON.parse(tmp[i][1]),
					date: tmp[i][2],
					len: Math.floor((tmp[i][3] / 10000) * 100) / 100
				}
			}
			nodes = tmp

			populate()
		})
	})

	function populate () {
		for (let i = nodes.length - 1; i >= 0; i--) {
			makeMarker(nodes[i])
		}

	}

	function makeMarker (node) {
		let m = document.createElement('div')

		axios.get(
			'https://api.mapbox.com/v4/geocode/mapbox.places/' +
			node.loc.lon +
			',' +
			node.loc.lat +
			'.json?access_token=' +
			mapboxgl.accessToken)
		.then(response => {
			node.city = response.data.features[2].place_name
			console.log(node)

			m.setAttribute('data-ID', node.id)
			m.setAttribute('data-city', node.city)
			m.setAttribute('data-date', node.date)
			m.setAttribute('data-len', node.len)

			new mapboxgl.Marker(m)
			.setLngLat([node.loc.lon, node.loc.lat])
			.addTo(map)
		})
	}

	function showModal(event) {
		console.log(event)
	}
}(jQuery));


