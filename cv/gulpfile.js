const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const imageMin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function browserSyncFn() {
  browserSync.init({
    server: { baseDir: 'src/' },
    notify: false,
    online: true
  })
}

function scriptsFn() {
  return src(['src/js/index.js'])
  .pipe(concat('app.min.js'))
  .pipe(uglify())
  .pipe(dest('src/js/'))
  .pipe(browserSync.stream())
}

function stylesFn() {
  return src('src/scss/main.scss')
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleanCss(({ level: {1: {specialComments: 0}} })))
    .pipe(dest('src/css/'))
    .pipe(browserSync.stream())
}

function imageMinFn() {
  return src('src/assets/original/**/*')
    .pipe(newer('src/assets/minified/'))
    .pipe(imageMin())
    .pipe(dest('src/assets/minified/'))
}

function cleanImg() {
  return del('src/assets/minified/**/*', { force: true });
}

function cleanDist() {
  return del('dist', { force: true });
}

function buildFn() {
  return src([
    'src/css/**/*.min.css', 
    'src/js/**/*.min.js', 
    'src/assets/minified/**/*', 
    'src/**/*.html'], 
    { base: 'src' })
    .pipe(dest('dist'))
}

function watchFn() {
  watch('src/**/scss/**/*', stylesFn);
  watch(['src/**/*.js', '!src/**/*.min.js'], scriptsFn);
  watch('src/**/*.html').on('change', browserSync.reload)
  watch('src/assets/original/**/*', imageMinFn)
}

exports.scriptsExp = scriptsFn;
exports.browserSyncExp = browserSyncFn;
exports.stylesExp = stylesFn;
exports.imageMinExp = imageMinFn;
exports.build = series(cleanDist, stylesFn, scriptsFn, imageMinFn, buildFn);

exports.default = parallel(stylesFn, scriptsFn, imageMinFn, browserSyncFn, watchFn);

