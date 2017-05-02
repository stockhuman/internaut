	
(function ($) {
	'use strict';

	var url = document.URL, 
			sort = '*';


	// the projects page
	$('.isotope').isotope({
		itemSelector: '.item',
		columnWidth: '.project',
		percentPosition: true
	});

}(jQuery));
