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
var themeDirectory       = settings.themeDirectory;
var mapURL  = themeDirectory;


gulp.task( 'customizerStyles', function() {
    console.log(settings.customizerFiles.length);
    for (i = 0; i < settings.customizerFiles.length; i++) { 
		gulp.src( themeDirectory + settings.customizerFiles[i] + '*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}) )
		.on( 'error', console.error.bind( console ) )
		.pipe( autoprefixer({ browsers: [ 'last 10 versions', 'cover 99.5%' ] }) )
		.pipe( sourcemaps.write('../maps') )
		.pipe( gulp.dest( themeDirectory + settings.customizerFiles[i] ) ); 
    }
});

