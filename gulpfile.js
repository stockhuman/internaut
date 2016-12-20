/*
	Michael Hemingway (c) 2016
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// compiles sass files to css
gulp.task('sass', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', function (err) {
			console.error(err.message);
			browserSync.notify(err.message, 3000); // Display error in the browser
			this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
		})) // Using gulp-sass
		.pipe(gulp.dest('assets/css/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// does browser live-reloading
gulp.task('browserSync', function () {
	browserSync.init({
		proxy: 'http://localhost:8888/WPdev/'
	});
});


gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('*.php', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
});

// stop old version of gulp watch from running when you modify the gulpfile
gulp.watch("gulpfile.js").on("change", function () {
	process.exit(0);
});
