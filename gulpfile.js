const gulp = require('gulp');
const util = require('gulp-util');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const connect = require('gulp-connect');

gulp.task('pdf', function() {
  return gulp.src('./*.html').pipe(html2pdf({printMediaType: true, pageSize: "letter"})).pipe(gulp.dest('./pdf/'));
});

gulp.task('styles', function() {
  return gulp.src('./scss/**/*.scss').pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)).pipe(gulp.dest('./dist/styles/')).pipe(connect.reload());
});

gulp.task('templates', function() {
  return gulp.src('./templates/*.pug').pipe(pug().on('error', util.log)).pipe(gulp.dest('./dist/')).pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src(['images/**/*']).pipe(gulp.dest('dist/images'));
});

gulp.task('watchStyles', function() {
  gulp.watch('./scss/**/*.scss', ['styles']);
});

gulp.task('watchTemplates', function() {
  gulp.watch('./templates/**/*.pug', ['templates']);
});

gulp.task('connect', function() {
  connect.server({root: './dist/', port: 8081, livereload: true});
});

gulp.task('build', ['styles', 'templates', 'images']);

gulp.task('default', [
  'styles',
  'templates',
  'images',
  'watchStyles',
  'watchTemplates',
  'connect'
]);
