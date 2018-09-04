// Load Gulp...of course
var gulp         = require( 'gulp' );
var paths = require('../gulpconfig.json');
var pkg = require('../../package.json');
var fs = require('fs-extra');
var got = require('got');

// var webpack = require('webpack');

// CSS related plugins
var sass         = require( 'gulp-sass' );
var autoprefixer = require( 'gulp-autoprefixer' );


// JS related plugins
var concat       = require( 'gulp-concat' );
var uglify       = require( 'gulp-uglify' );
// var babelify     = require( 'babelify' );
// var browserify   = require( 'browserify' );
// var source       = require( 'vinyl-source-stream' );
// var buffer       = require( 'vinyl-buffer' );
// var stripDebug   = require( 'gulp-strip-debug' );

// Utility plugins
var rename       = require( 'gulp-rename' );
// var sourcemaps   = require( 'gulp-sourcemaps' );
// var notify       = require( 'gulp-notify' );
// var plumber      = require( 'gulp-plumber' );
// var options      = require( 'gulp-options' );
// var gulpif       = require( 'gulp-if' );
var glob 		 = require( 'glob' );

//postCSS specific
var postcss		 = require( 'gulp-postcss' );
var postCSSautoprefixer = require('autoprefixer');
var flexibility     = require('postcss-flexibility');


//rtlcss
var rtlcss       = require('gulp-rtlcss');
var filter       = require('gulp-filter');
const bump       = require('gulp-bump');
const replace	= require('gulp-replace');

// const wpPot 	= require('gulp-wp-pot');

var browserSync  = require( 'browser-sync' ).create();

noRTL = paths.excludeRTL;
noFontAwesome = paths.excludeFA;
noFontFiles = paths.excludeFonts;
const filterAll = filter(["**/*.css", noRTL, noFontAwesome, noFontFiles], {restore: true});

var themeDirectory       = paths.themeDirectory;
const unminifiedCSS = themeDirectory + paths.assets.css.unminified;
const minifiedCSS   = themeDirectory + paths.assets.css.minified; 


const unminifiedJS = themeDirectory + paths.assets.js.unminified;
const minifiedJS   = themeDirectory + paths.assets.js.minified; 
const jsAssets		= themeDirectory + paths.assets.jsroot; 
var jsConcat       = paths.assets.jsconcat;
var fileList = glob.sync(unminifiedJS + '**.js')


var styleWatch   = themeDirectory + '/sass/**/*.scss';
var jsWatch      = themeDirectory + '/assets/js/unminified/*.js';
var phpWatch     = themeDirectory + '/../**/*.php';
var projectURL		= paths.projectURL;

oldVersion = pkg.version;

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

var postCSSOptions =  {
	map: false,
	processors: [
		flexibility,
		postCSSautoprefixer(prefixOptions)
	]
}

gulp.task( 'customizerSass', function() {
    for (i = 0; i < paths.customizerFiles.length; i++) { 
		gulp.src( themeDirectory + paths.customizerFiles[i] + '*.scss' )
		.pipe( sass(sassExpanded).on('error', sass.logError))
		.pipe( autoprefixer(prefixOptions) )
		.pipe( gulp.dest( themeDirectory + paths.customizerFiles[i] )); 
    }
});

gulp.task( 'editorSass', function() {
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


gulp.task( 'commonSass', function() {
	gulp.src( themeDirectory + paths.sass.root + 'style.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe(postcss(postCSSOptions.processors))
	.pipe( gulp.dest(unminifiedCSS))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe(gulp.dest(unminifiedCSS)); 
});


gulp.task( 'compatibilitySass', function() {
	gulp.src( themeDirectory + paths.sass.compatibility + '**.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe(postcss(postCSSOptions.processors))
	.pipe( gulp.dest( unminifiedCSS + 'compatibility/' ))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe( gulp.dest( unminifiedCSS + 'compatibility/' )); 
});

gulp.task( 'woocommerceSass', function() {
	gulp.src( themeDirectory + paths.sass.woocommerce + '**.scss' )
	.pipe( sass(sassExpanded).on('error', sass.logError))  
	.pipe( autoprefixer(prefixOptions) )
	.pipe( gulp.dest( unminifiedCSS + 'compatibility/woocommerce/' ))
	.pipe(filterAll)
	.pipe(rtlcss()) 
	.pipe(rename({ suffix: '-rtl' })) 
	.pipe( gulp.dest( unminifiedCSS + 'compatibility/woocommerce/' )); 
});


gulp.task('minify', function(){
	gulp.src([unminifiedCSS + "**/*.css", unminifiedCSS + "*.css"])
	.pipe(minifyCSS())
	.pipe(rename({suffix: '.min'}))
	.pipe(rename(function(opt) {
		opt.basename = opt.basename.replace("-rtl.min", ".min-rtl");
		return opt;
	  }))
	.pipe(gulp.dest(minifiedCSS));
});


gulp.task('compressJS', function () {
    gulp.src(unminifiedJS + '*.js')
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(minifiedJS))
});

gulp.task('concatenateJS', function() {
	let jsConcatFullPath = jsConcat.map(file => {
		return themeDirectory + file;
	});
	const srcBase = themeDirectory + paths.assets.jsroot;
	return gulp.src(jsConcatFullPath, {base: srcBase})
	  .pipe(concat('style.min.js'))
	  .pipe(gulp.dest(minifiedJS));
});


gulp.task('bumpPackageJSON', function(){
	gulp.src('./package.json')
	.pipe(bump())
	.pipe(gulp.dest('./'));
});

gulp.task('bumpWPtheme', function(){
	gulp.src(themeDirectory + 'style.css')
	.pipe(bump())
	.pipe(gulp.dest(themeDirectory));
});

gulp.task('phpConstants', function(){
	pkg = require('./package.json');
	newVersion = 'ASTRA_THEME_VERSION\', \'' + pkg.version + '\'';
	gulp.src(themeDirectory + 'functions.php')
	.pipe(replace(/ASTRA_THEME_VERSION', '.*?'/g, newVersion))
	.pipe(gulp.dest(themeDirectory));
});


gulp.task('fonts', function(){
	
	let googleApi = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyArUrvacsexShNpBZ9dxNTRR97bY6f0JCk';
	let fileName = themeDirectory + paths.assets.googleFonts;
	
	(async () => {
		try {
			const response = await got(googleApi);
			var fonts = JSON.parse(response.body).items.map(function (font) {
				return {
					[font.family] : {
						'variants' : font.variants,
						'category' : font.category
					}
				};
			})
			fs.writeJson(fileName, fonts)
			.then(() => {
				console.log('success!')
			})
			.catch(err => {
				console.error(err)
			})
		} catch (error) {
			console.log(error.response.body);
			//=> 'Internal server error ...'
		}
	})();
});

gulp.task('allSass', ['customizerSass', 'editorSass', 'commonSass', 'compatibilitySass', 'woocommerceSass']);
gulp.task('styles', ['allSass', 'minify']);
gulp.task('scripts', ['compressJS', 'concatenateJS']);
gulp.task('compileAssets', ['styles', 'scripts']);
gulp.task('versionUp', ['bumpPackageJSON', 'bumpWPtheme', 'phpConstants']);


gulp.task( 'watchLive', function() {
	console.log(projectURL);
	browserSync.init({
		proxy: projectURL,
		injectChanges: true,
		open: false
	});
});

gulp.task( 'watchTheme', ['compileAssets', 'watchLive'], function() {
	gulp.watch( phpWatch, browserSync.reload );
	gulp.watch( styleWatch, [ 'styles', browserSync.reload ] );
	gulp.watch( jsWatch, [ 'pluginJS', browserSync.reload ] );
});

