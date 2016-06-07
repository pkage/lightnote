// get gulp in here
var gulp = require('gulp');


// load in our modules
var jshint = require('gulp-jshint'); // lint javascript!
var uglify = require('gulp-uglify'); // uglify!
var concat = require('gulp-concat'); // concatenate files!
var sass = require('gulp-sass'); // compile sass!
var rename = require('gulp-rename'); // rename files
var autoprefixer = require('gulp-autoprefixer'); // prefix css
var gutil = require('gulp-util'); // logging, etc.
var dedupe = require('gulp-dedupe'); // de-duplicate css
var cleancss = require('gulp-clean-css'); // clean resulting css
var babel = require('gulp-babel'); // babelify for es6
var clean = require('gulp-clean'); // cleaner module
var copy = require('gulp-copy'); // copy files
var reload = require('gulp-livereload'); // reloader
var serve = require('gulp-serve'); // serve
var copy = require('gulp-copy'); // copier

var babelopts = {
	presets: ['es2015-without-strict'],
};

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}


// lint task
gulp.task('lint', function() {
	return gulp.src('src/js/*.js')
		.pipe(babel(babelopts))
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});


// compile scss
gulp.task('scss', function() {
	return gulp.src('src/scss/main.scss')
		.pipe(sass())
		.on('error', handleError)
		.pipe(autoprefixer())
		.on('error', gutil.log)
		.pipe(rename('dist.css'))
		.pipe(gulp.dest('static/'))
		.pipe(dedupe())
		.pipe(cleancss())
		.pipe(rename('static.min.css'))
		.pipe(gulp.dest('static/'))
		.pipe(reload());
});

// compile js
gulp.task('scripts', function() {
	return gulp.src('src/js/*.js')
		.pipe(concat('dist.js'))
		.pipe(babel(babelopts))
		.on('error', handleError)
		.pipe(gulp.dest('static/'))
		.pipe(rename('dist.min.js'))
		.pipe(uglify())
		.on('error', handleError)
		.pipe(gulp.dest('static/'))
		.pipe(reload());
});

// copy html
gulp.task('copyhtml', function() {
	return gulp.src('src/html/*.html')
		.pipe(copy('.', {
			prefix: 2
		}));
});

// watcher task
gulp.task('watch', function() {
	gulp.watch('src/scss/*', ['scss']);
	gulp.watch('src/js/*', ['lint', 'scripts']);
	gulp.watch('src/html/*', ['copyhtml']);
});

// serve task
gulp.task('serve', serve(['.']));

gulp.task('default', [
	'lint',
	'scss',
	'scripts',
	'watch',
	'copyhtml',
	'serve'
]);
