var gulp = require('gulp');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task('build', ['clean'], function () {
  procSass(true);
});

gulp.task('watch', ['clean'], function () {
  procSass();
  gulp.watch('./scss/{,**/}*.{scss,sass}', ['sass']);
});

gulp.task('clean', function () {
  return gulp.src('./css/*', { read: false })
    .pipe(clean());
});

gulp.task('sass', procSass);

/**
 * Estilos
 */
function procSass(release = false) {
  if (release === true) {
    return gulp.src('./scss/**/*.scss')
      .pipe(wait(500))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./css'));
  } else {
    return gulp.src('./scss/**/*.scss')
      .pipe(wait(1000))
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./css'));
  }
}
