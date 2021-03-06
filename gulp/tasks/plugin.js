// Load Gulp...of course
var gulp         = require( 'gulp' );
var settings = require('../gulpconfig.json');


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

var stylesAdmin     = pluginDir + '/src/scss/stylesAdmin.scss';
var stylesFrontEnd   = pluginDir + '/src/scss/stylesFrontEnd.scss';

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
	gulp.src( [stylesAdmin, stylesFrontEnd] )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'compressed'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe( sourcemaps.write('./') )
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

 gulp.task( 'compilePlugin', ['pluginStyles', 'pluginJS'], function() {
	gulp.src( jsURL + 'myscript.min.js' )
		.pipe( notify({ message: 'Assets Compiled!' }) );
 });

 gulp.task( 'watchPlugin', ['compilePlugin', 'plugin-browser-sync'], function() {
	gulp.watch( phpWatch, reload );
	gulp.watch( styleWatch, [ 'pluginStyles' ] );
	gulp.watch( jsWatch, [ 'pluginJS', reload ] );
	gulp.src( jsURL + 'myscript.min.js' )
		.pipe( notify({ message: 'Gulp is Watching, Happy Coding!' }) );
 });
