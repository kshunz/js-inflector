var browserify = require('gulp-browserify');
var chai = require('chai');
var gulp = require('gulp');
var minify = require('gulp-uglify');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');

gulp.task('package', function() {
  return gulp.src('./src/inflector.js')
  .pipe(browserify())
  .pipe(rename('js-inflector.js'))
  .pipe(gulp.dest('./dist'));
});
gulp.task('package-min', ['package'], function() {
  return gulp.src('./dist/js-inflector.js')
  .pipe(minify({}))
  .pipe(rename('js-inflector.min.js'))
  .pipe(gulp.dest('./dist'));
});
gulp.task('test', function() {
  global.expect = chai.expect;
  global.STATES = require('./src/defaults/states');
  global.GROUPS = require('./src/defaults/groups');

  return gulp.src(['!./tests/**/*_xtest*', './tests/**/*_test*.js'])
  .pipe(mocha());
});

gulp.task('default', ['test', 'package-min']);
