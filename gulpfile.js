// Load Gulp...of course
var gulp         = require( 'gulp' );
var paths = require('./junk.json');

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

//postCSS specific
var postcss		 = require( 'gulp-postcss' );
var postCSSautoprefixer = require('autoprefixer');
var flexibility     = require('postcss-flexibility');

//rtlcss
var rtlcss       = require('gulp-rtlcss');
var filter       = require('gulp-filter');



var SRC = '';
var DEST ='';
var themeDirectory       = paths.themeDirectory;
var mapURL  = themeDirectory;

var sassExpanded = {
	errLogToConsole: true,
	outputStyle: 'expanded',
	linefeed: 'lf'
};


var prefixOptions = {
	browsers: [
		'Android >= 2.1',
		'Chrome >= 21',
		'Edge >= 12',
		'Explorer >= 7',
		'Firefox >= 17',
		'Opera >= 12.1',
		'Safari >= 6.0'
	],
	cascade: false
};

// var prefixOptions = {
// 	browsers: [
// 		'last 10 versions'
// 	],
// 	cascade: false
// };

var postCSSOptions =  {
	map: false,
	processors: [
		flexibility,
		postCSSautoprefixer(prefixOptions)
	]
}
// exclude these files from generating rtlcss
const f = filter(paths.rtlExclude);





gulp.task( 'customizerStyles', function() {
    for (i = 0; i < paths.customizerFiles.length; i++) { 
		gulp.src( themeDirectory + paths.customizerFiles[i] + '*.scss' )
		// .pipe( sourcemaps.init() )
		.pipe( sass(sassExpanded).on('error', sass.logError))
		.pipe( autoprefixer(prefixOptions) )
		// .pipe( sourcemaps.write('../maps') )
		.pipe( gulp.dest( themeDirectory + paths.customizerFiles[i] ) ); 
    }
});

gulp.task( 'editorStyles', function() {
	gulp.src( themeDirectory + paths.editorFiles.src )
	// .pipe( sourcemaps.init() )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	// .pipe( sourcemaps.write('../maps') )
	.pipe( gulp.dest( themeDirectory + paths.editorFiles.dest ) ); 
});


gulp.task( 'commonStyle', function() {
	gulp.src( themeDirectory + paths.sass.root + 'style.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe(postcss(postCSSOptions.processors))
	.pipe( gulp.dest( themeDirectory + paths.assets.css.unminified.root ) )
	.pipe(f)
	.pipe(rtlcss()) // Convert to RTL.
	.pipe(rename({ suffix: '-rtl' })) // Append "-rtl" to the filename.
	.pipe(gulp.dest(themeDirectory + paths.assets.css.unminified.root)); // Output RTL stylesheets. 
});


gulp.task( 'compatibilityStyle', function() {
	gulp.src( themeDirectory + paths.sass.compatibility + '**.scss' )
	// .pipe( sourcemaps.init() )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe(postcss(postCSSOptions.processors))
	// .pipe( sourcemaps.write('../maps') )
	.pipe( gulp.dest( themeDirectory + paths.assets.css.unminified.compatibility ) ); 
});

gulp.task( 'woocommerceStyle', function() {
	gulp.src( themeDirectory + paths.sass.woocommerce + '**.scss' )
	// .pipe( sourcemaps.init() )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	// .pipe( sourcemaps.write('../maps') )
	.pipe( gulp.dest( themeDirectory + paths.assets.css.unminified.woocommerce ) ); 
});

