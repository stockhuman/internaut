(function ($) {
	'use strict';

	$.ajax({
			url: "https://api.tumblr.com/v2/blog/ackbario.tumblr.com/posts?api_key=yPW31OFh7rJtowQMcBNU4xgE55bJebKJUd5jHzZ1aEGDz5Qy1F",
			dataType: 'jsonp',
			success: function (data) {
				builder(data);
			}
	});

	// arranges posts
	function builder (data) {

		var posts = data.response.posts;
		var body = ''; // avoid printing 'undefined'

		console.log(posts)

		for (var i = 0; i < posts.length; i++) {
			var p = posts[i];
			var date = p.date.slice(0, -13); // quick and dirty truncation to YYYY-MM-DD

			// My beautiful pseudo templating engine
			body += '<div class="item">'

			if (p.title !== undefined) {
				body += '<h2 class="title"><a href="' + p.slug +'">' + p.title + '</a></h2>'
			}
			

			// photo posts
			if (p.type === 'photo') {
				body +='<img src=' +  p.photos[0].original_size.url + '>' + p.caption;
			}

			// video posts
			if (p.type === 'video') {
				body += '<div class="video-container">' + 
							p.player[0].embed_code +
							'</div>' +'<p></p>' +
							p.caption;
			}

			// body posts
			if (p.type === 'text') {
				body += ''
				// body += p.caption;
			}

			body += '<p><a href='+ p.post_url +'>link</a></p>';

			body += '<p class="date">'+ date +'</p></div>';
		}

		$('#tumblr').append(body);
	}
}(jQuery))