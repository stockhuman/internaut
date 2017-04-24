
(function ($) {
	'use strict';

	var url = document.URL, 
			sort = '*';

	// function parseQuery(qstr) {
	// 	var query = {};
	// 	var a = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
	// 	for (var i = 0; i < a.length; i++) {
	// 			var b = a[i].split('=');
	// 			query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
	// 	}
	// 	return query;
	// }

	// the projects page
	$('.isotope').isotope({
		itemSelector: '.item',
		columnWidth: '.project',
		percentPosition: true
	});

	// $(window).on('load', function () {
	// 	console.log(parseQuery('date'));
	// });


}(jQuery));
