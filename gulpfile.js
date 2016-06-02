var gulp = require('gulp'),
	sass = require('gulp-sass'),
	changed = require('gulp-changed'),
	watch = require('gulp-watch');
	autoprefixer = require('gulp-autoprefixer'),
	cleancss = require('gulp-clean-css'),
	browsersync = require('browser-sync').create(),
	imagemin = require('gulp-imagemin'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	del = require('del'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	replace = require('gulp-replace'),
	pathLess = require('path');


var path = {
	dist : './dist/',
	sassfolder : './src/sass/',
	sass : './src/sass/*.scss',
	cssfolder : './src/css/',
	css : './src/css/*.css',
	htmlfolder : './src/',
	html : './src/*.html',
	jsfolder : './src/js/',
	js : './src/js/*.js',
	img: './src/images/**/*',
	lib: './src/lib/**/*'
};

/*del output*/
gulp.task('del' , function () {
	del(path.dist);
});

/*watch Sass- useless*/
gulp.task('watchSass' , function() {
	return gulp.src(path.sass)
		.pipe(watch(path.sass))
		.pipe(changed(path.cssfolder))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			broswers:['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.cssfolder));
});

/*Sass  compile*/
gulp.task('sass' , function() {
	return gulp.src(path.sass)
		.pipe(changed(path.cssfolder))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer({
			broswers:['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.cssfolder));
});

/*css output*/
gulp.task('outCss' , function() {
	return gulp.src(path.css)
		.pipe(cleancss({compatibility: 'ie8'}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/css'))
});

/*html output*/
gulp.task('outHtml' , function() {
	return gulp.src(path.html)
		.pipe(replace(/css\/(.+)\.css/g , 'css/$1.min.css'))
		.pipe(replace(/js\/(.+)\.js/g , 'js/$1.min.js'))
		.pipe(gulp.dest('./dist/'))
});

/*javascript output*/
gulp.task('outScript' , function () {
	return gulp.src(path.js)
		.pipe(uglify())
		.pipe(rename({suffix : '.min'}))
		.pipe(gulp.dest('./dist/js'));
});

/*image output*/
gulp.task('outImg', () =>
	gulp.src(path.img)
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/images'))
);

/*library output*/
gulp.task('outLib' , function () {
	return gulp.src(path.lib)
		.pipe(gulp.dest('./dist/lib'));
});

/*browser-sync */
gulp.task('browser-sync', ['sass'] , function () {
	browsersync.init({
		port:3000,
		server : {
			baseDir : ['./'],
			index : './'
		}
	});
	gulp.watch(path.sass , ['sass']);
	gulp.watch(path.css).on('change' , browsersync.reload);
	gulp.watch(path.js).on('change' , browsersync.reload);
	gulp.watch(path.html).on('change' , browsersync.reload);
});

/*gulp output*/
gulp.task('out',['outCss','outHtml','outScript','outImg','outLib']);







