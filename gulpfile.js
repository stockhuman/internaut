/*
	Arthem (c) 2017
	==
	run the whole shabang with `$ gulp watch` in the project directory
	install them all with
	`$ npm i gulp gulp-sass gulp-concat gulp-rename gulp-uglify browser-sync --save-dev`
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

var assetDir = "public/assets/";

// compiles sass files to css
gulp.task('sass', function () {
	return gulp.src('scss/**/*.scss')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', function (err) {
			console.error(err.message);
			browserSync.notify(err.message, 3000); // Display error in the browser
			this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
		})) // Using gulp-sass
		.pipe(gulp.dest( assetDir + 'css/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// similarly to the sass tast, scripts compiles and concatinates js files and reloads the browser
gulp.task('scripts', function() {
	// script paths
	var jsSources = 'js/*.js',
	    jsDist = assetDir + 'js/';

  return gulp.src(jsSources)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(jsDist))
		.pipe(rename('app.min.js'))
		.pipe(uglify().on('error', function (err) {
			console.error(err.message);
			browserSync.notify(err.message, 3000); // Display error in the browser
			this.emit('end'); // Prevent gulp from catching the error and exiting the watch process
		}))
		.pipe(gulp.dest(jsDist))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// does browser live-reloading
// change to appropriate WordPress install directory
gulp.task('browserSync', function () {
	browserSync.init({
		proxy: 'http://localhost:9000/'
	});
});

// watches files for changes, adjust accordingly
gulp.task('watch', ['browserSync', 'sass'], function () {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('public/**/**/*.ejs', browserSync.reload);
	gulp.watch('public/**/**/*.json', browserSync.reload);
});

// stop old version of gulp watch from running when you modify the gulpfile
gulp.watch("gulpfile.js").on("change", function () {
	process.exit(0);
});
