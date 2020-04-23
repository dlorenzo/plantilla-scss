var gulp = require('gulp');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var package = require('./package.json');

// Paths
var scss = package.config.scss;
var css = package.config.css;

gulp.task('clean', async function () {
  gulp.src(css + '/**.css', { read: false })
    .pipe(clean());
});

gulp.task('build', gulp.series('clean', async function () {
  procSass(true);
}));

gulp.task('watch', gulp.series('clean', async function () {
  procSass();
  gulp.watch(scss + '/{,**/}*.{scss,sass}', gulp.series('sass'));
}));

gulp.task('sass', async function() {
  procSass();
});

/**
 * Estilos
 */
function procSass(release) {
  gulp.src(scss + '/**/*.scss')
    // RELEASE
    .pipe(gulpif(release, wait(500)))
    .pipe(gulpif(release, sass({ outputStyle: 'compressed' }).on('error', sass.logError)))
    // DEBUG
    .pipe(gulpif(!release, wait(1000)))
    .pipe(gulpif(!release, sourcemaps.init()))
    .pipe(gulpif(!release, sass().on('error', sass.logError)))
    .pipe(gulpif(!release, sourcemaps.write()))
    .pipe(gulp.dest(css));
}
