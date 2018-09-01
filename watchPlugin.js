// Load Gulp...of course
var gulp         = require( 'gulp' );
var settings = require('../settings'); 

// CSS related plugins
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );
var minifycss    = require( 'gulp-uglifycss' );

// JS related plugins
var concat       = require( 'gulp-concat' );
var uglify       = require( 'gulp-uglify' );
var babelify     = require( 'babelify' );
var browserify   = require( 'browserify' );
var source       = require( 'vinyl-source-stream' );
var buffer       = require( 'vinyl-buffer' );
var stripDebug   = require( 'gulp-strip-debug' );

// Utility plugins
var rename       = require( 'gulp-rename' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var notify       = require( 'gulp-notify' );
var plumber      = require( 'gulp-plumber' );
var options      = require( 'gulp-options' );
var gulpif       = require( 'gulp-if' );

// Browers related plugins
var browserSync  = require( 'browser-sync' ).create();
var reload       = browserSync.reload;

// Project related variables
var projectURL   = settings.adminURL;

var pluginDir    = settings.pluginDir;

var styleForm     = pluginDir + '/src/scss/form.scss';
var styleSlider   = pluginDir + '/src/scss/slider.scss';
var styleSRC      = pluginDir + '/src/scss/mystyle.scss';

var styleURL     = pluginDir + '/assets/';
var mapURL       = pluginDir + '/';

var jsSRC        = pluginDir + '/src/js/';
var jsAdmin		 = 'myscript.js';
var jsForm		 = 'form.js';
var jsSlider	 = 'slider.js';
var jsFiles      = [jsAdmin, jsForm, jsSlider];

var jsURL        = pluginDir + '/assets/';

var styleWatch   = pluginDir + '/src/scss/**/*.scss';
var jsWatch      = pluginDir + '/src/js/**/*.js';
var phpWatch     = pluginDir + '/**/*.php';

// Tasks
gulp.task( 'plugin-browser-sync', function() {
	console.log(projectURL);
	browserSync.init({
		proxy: projectURL,
		injectChanges: true,
		open: false
	});


});

gulp.task( 'pluginStyles', function() {
	gulp.src( [styleSRC, styleForm, styleSlider] )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe( sourcemaps.write( mapURL ) )
		.pipe( gulp.dest( styleURL ) )
		.pipe( browserSync.stream() );
});

gulp.task( 'pluginJS', function() {

	jsFiles.map(function(entry){
		return browserify({
			entries: [jsSRC + entry]
		})
		.transform( babelify, { presets: [ 'env' ] } )
		.bundle()
		.pipe( source( entry ) )
		.pipe( buffer() )
		.pipe( gulpif( options.has( 'production' ), stripDebug() ) )
		.pipe( sourcemaps.init({ loadMaps: true }) )
		.pipe( uglify() )
		.pipe( sourcemaps.write( '.' ) )
		.pipe( gulp.dest( jsURL ) )
		.pipe( browserSync.stream() );
	});
	
});

function triggerPlumber( src, url ) {
	return gulp.src( src )
	.pipe( plumber() )
	.pipe( gulp.dest( url ) );
}

 gulp.task( 'compileAssets', ['pluginStyles', 'pluginJS'], function() {
	gulp.src( jsURL + 'myscript.min.js' )
		.pipe( notify({ message: 'Assets Compiled!' }) );
 });

 gulp.task( 'watchPlugin', ['compileAssets', 'plugin-browser-sync'], function() {
	 console.log(projectURL);
	gulp.watch( phpWatch, reload );
	gulp.watch( styleWatch, [ 'pluginStyles' ] );
	gulp.watch( jsWatch, [ 'pluginJS', reload ] );
	gulp.src( jsURL + 'myscript.min.js' )
		.pipe( notify({ message: 'Gulp is Watching, Happy Coding!' }) );
 });
