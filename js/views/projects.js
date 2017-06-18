// the projects page

var url = document.URL, 
		filterBtnGroup = $('#project-filters a');

var projects = $('.isotope').isotope({
	itemSelector: '.item',
	columnWidth: '.project',
	percentPosition: true
});

// filter the isotope layout
filterBtnGroup.on('click', function (e) {
	e.preventDefault();
	var filterVal = $(this).attr('data-filter');
	projects.isotope({filter: filterVal});
});

projects.imagesLoaded().progress( function() {
  projects.isotope('layout');
});

