// Load Gulp...of course
var gulp         = require( 'gulp' );
var paths = require('./junk.json');

// CSS related plugins
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );


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
// const f = filter(paths.excludeAll); // exclude these files from generating rtlcss
noRTL = paths.excludeRTL;
noFontAwesome = paths.excludeFA;
noFontFiles = paths.excludeFonts;
const filterAll = filter(["**/*.css", noRTL, noFontAwesome, noFontFiles], {restore: true});
const filterRTL = filter(["**/*.css", noRTL], {restore: true});
const filterRTL2 = filter(["*.css", noRTL], {restore: true});

var themeDirectory       = paths.themeDirectory;
const unminified = themeDirectory + paths.assets.css.unminified;
const minified   = themeDirectory + paths.assets.css.minified; 


//minify CSS using gulp-clean-css
let minifyCSS    = require('gulp-clean-css');


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


gulp.task( 'customizerStyle', function() {
    for (i = 0; i < paths.customizerFiles.length; i++) { 
		gulp.src( themeDirectory + paths.customizerFiles[i] + '*.scss' )
		.pipe( sass(sassExpanded).on('error', sass.logError))
		.pipe( autoprefixer(prefixOptions) )
		.pipe( gulp.dest( themeDirectory + paths.customizerFiles[i] )); 
    }
});

gulp.task( 'editorStyle', function() {
	gulp.src( themeDirectory + paths.editorFiles.src )
	// .pipe( sourcemaps.init() )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	// .pipe( sourcemaps.write('../maps') )
	.pipe( gulp.dest( themeDirectory + paths.editorFiles.dest ))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe(gulp.dest(themeDirectory + paths.editorFiles.dest)); 
});


gulp.task( 'commonStyle', function() {
	console.log(unminified);
	gulp.src( themeDirectory + paths.sass.root + 'style.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe(postcss(postCSSOptions.processors))
	.pipe( gulp.dest(unminified))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe(gulp.dest(unminified)); 
});


gulp.task( 'compatibilityStyle', function() {
	gulp.src( themeDirectory + paths.sass.compatibility + '**.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe(postcss(postCSSOptions.processors))
	.pipe( gulp.dest( unminified + 'compatibility/' ))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe( gulp.dest( unminified + 'compatibility/' )); 
});

gulp.task( 'woocommerceStyle', function() {
	gulp.src( themeDirectory + paths.sass.woocommerce + '**.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe( gulp.dest( unminified + 'compatibility/woocommerce/' ))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe( gulp.dest( unminified + 'compatibility/woocommerce/' )); 
});


gulp.task('minify', function(){
	gulp.src([unminified + "**/*.css", unminified + "*.css"])
	.pipe(filterRTL)
	.pipe(filterRTL2)
	.pipe(minifyCSS())
	.pipe(rename({suffix: '.min'}))
	.pipe(rename(function(opt) {
		opt.basename = opt.basename.replace("-rtl.min", ".min-rtl");
		return opt;
	  }))
	.pipe(gulp.dest(minified));
});






































// https://fettblog.eu/gulp-recipes-part-1/

// var gulp   = require('gulp');
// var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
// var rename = require('gulp-rename');
// // this node module will do the trick
// var merge  = require('merge2');

// gulp.task('scripts', function() {
// 	// we use the array map function to map each
// 	// entry in our configuration array to a function
// 	var tasks = config.map(function(entry) {
// 		// the parameter we get is this very entry. In
// 		// that case, an object containing src, name and
// 		// dest.
// 		// So here we create a Gulp stream as we would
// 		// do if we just handle one set of files
// 		return gulp.src(entry.src)
// 			.pipe(concat())
// 			.pipe(uglify())
// 			.pipe(rename(entry.name))
// 			.pipe(gulp.dest(entry.dest))
// 	});
// 	// tasks now includes an array of Gulp streams. Use
// 	// the `merge-stream` module to combine them into one
// 	return merge(tasks);
// });