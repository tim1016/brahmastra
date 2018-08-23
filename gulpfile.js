// Load Gulp...of course
var gulp         = require( 'gulp' );
var settings = require('./junk.json');

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

var SRC = '';
var DEST ='';
var mapURL       = settings.themeDirectory;


gulp.task( 'printPaths', function() {
    console.log(settings.customizerFiles.length);
    for (i = 0; i < settings.customizerFiles.length; i++) { 
        SRC  = settings.themeDirectory + settings.customizerFiles[i].src;
        DEST = settings.themeDirectory + settings.customizerFiles[i].dest + '/../';

		gulp.src( SRC )
		// .pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 10 versions', 'cover 99.5%' ] }) )
		// .pipe( sourcemaps.write( DEST ) )
		.pipe( gulp.dest( DEST ) ); 
		SRC='';
		DEST='';


		// .pipe( browserSync.stream() );



        // SRC  = settings.themeDirectory + settings.customizerFiles[i].src;
        // DEST = settings.themeDirectory + settings.customizerFiles[i].dest;
		// console.log(SRC);
		// console.log(DEST);
		
    }

});



// gulp.task( 'pluginStyles', function() {
// 	gulp.src( [styleSRC, styleForm, styleSlider] )
// 		.pipe( sourcemaps.init() )
// 		.pipe( sass({
// 			errLogToConsole: true,
// 			outputStyle: 'compressed'
// 		}) )
// 		.on( 'error', console.error.bind( console ) )
// 		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
// 		.pipe( sourcemaps.write( mapURL ) )
// 		.pipe( gulp.dest( styleURL ) )
// 		.pipe( browserSync.stream() );
// });