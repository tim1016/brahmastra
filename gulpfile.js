// TODO: file, package.json
var gulp = require('gulp');
var rename = require('gulp-rename');
var rtlcss = require('gulp-rtlcss');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var compress = require('gulp-compress');
var clean = require('gulp-clean');
var wpI18n = require('gulp-wp-i18n');
var bumpup = require('gulp-bumpup');
var textReplace = require('gulp-text-replace');


gulp.task('postcss', function () {
  return gulp
    .src('assets/css/unminified/style.css')
  ;
});

gulp.task('postcss', function () { // WARNING: potential duplicate task
  return gulp
    .src('assets/css/unminified/*.css')
  ;
});

gulp.task('postcss', function () { // WARNING: potential duplicate task
  return gulp
    .src('assets/css/unminified/compatibility/*.css')
  ;
});

gulp.task('copy', function () {
  return gulp
    .src('**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!node_modules/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!build/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!css/sourcemap/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!.git/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!bin/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!.gitlab-ci.yml')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!bin/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!tests/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!phpunit.xml.dist')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!*.sh')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!*.map')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!Gruntfile.js')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!package.json')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!.gitignore')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!phpunit.xml')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!README.md')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!sass/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!codesniffer.ruleset.xml')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!vendor/**')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!composer.json')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!composer.lock')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!package-lock.json')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('copy', function () { // WARNING: potential duplicate task
  return gulp
    .src('!phpcs.xml.dist')
    .pipe(gulp.dest('astra/'))
  ;
});

gulp.task('clean', function () {
  return gulp
    .src('astra')
    .pipe(gulp.dest('main'))
  ;
});

gulp.task('clean', function () { // WARNING: potential duplicate task
  return gulp
    .src('*.zip')
    .pipe(gulp.dest('zip'))
  ;
});

gulp.task('makepot', function () {
  return gulp
    .src('[object Object]')
    .pipe(gulp.dest('target'))
  ;
});

gulp.task('addtextdomain', function () {
  return gulp
    .src('undefined')
    .pipe(gulp.dest(',,,,,'))
  ;
});

gulp.task('addtextdomain', function () { // WARNING: potential duplicate task
  return gulp
    .src('undefined')
    .pipe(gulp.dest(',,,,,'))
  ;
});

gulp.task('addtextdomain', function () { // WARNING: potential duplicate task
  return gulp
    .src('undefined')
    .pipe(gulp.dest(',,,,,'))
  ;
});

gulp.task('addtextdomain', function () { // WARNING: potential duplicate task
  return gulp
    .src('undefined')
    .pipe(gulp.dest(',,,,,'))
  ;
});

gulp.task('addtextdomain', function () { // WARNING: potential duplicate task
  return gulp
    .src('undefined')
    .pipe(gulp.dest(',,,,,'))
  ;
});

gulp.task('addtextdomain', function () { // WARNING: potential duplicate task
  return gulp
    .src('undefined')
    .pipe(gulp.dest(',,,,,'))
  ;
});

gulp.task('concat', function () {
  return gulp
    .src('assets/js/unminified/navigation.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js/unminified'))
  ;
});

gulp.task('concat', function () { // WARNING: potential duplicate task
  return gulp
    .src('assets/js/unminified/skip-link-focus-fix.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('assets/js/unminified'))
  ;
});

gulp.task('replace', function () {
  return gulp
    .src('style.css')
  ;
});

gulp.task('replace', function () { // WARNING: potential duplicate task
  return gulp
    .src('functions.php')
  ;
});

gulp.task('rtl', ["rtlcss"]);

gulp.task('scss', ["sass"]);

gulp.task('style', ["scss","postcss:style","rtl"]);

gulp.task('minify', ["style","uglify:js","cssmin:css","concat"]);

gulp.task('google-fonts', undefined);

gulp.task('release', ["clean:zip","copy:main","compress:main","clean:main"]);

gulp.task('version-bump', undefined);

gulp.task('i18n', ["addtextdomain","makepot"]);

