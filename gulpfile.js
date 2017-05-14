const gulp = require('gulp');
const util = require('gulp-util');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const html2pdf = require('gulp-html2pdf');
const argv = require('yargs').argv;

gulp.task('pdf', () =>
  gulp
    .src('./*.html')
    .pipe(html2pdf({
      printMediaType: true,
      pageSize: 'letter',
    }))
    .pipe(gulp.dest('./pdf/')));

gulp.task('styles', () =>
  gulp
    .src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles/'))
    .pipe(connect.reload()));

gulp.task('templates', () =>
  gulp
    .src('./templates/**/*.jade')
    .pipe(jade({
      locals: {
        company_name: argv.company_name,
        position: argv.position,
        name: argv.name,
      },
      pretty: true,
    })
    .on('error', util.log))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload()));

gulp.task('images', () =>
  gulp
    .src(['images/**/*'])
    .pipe(gulp.dest('dist/images')));

gulp.task('watchStyles', () =>
  gulp
    .watch('./scss/**/*.scss', ['styles']));

gulp.task('watchTemplates', () =>
  gulp.watch('./templates/**/*.jade', ['templates']));

gulp.task('connect', () =>
  connect.server({
    root: './dist/',
    port: 8081,
    livereload: true,
  }));

gulp.task('build', ['styles', 'templates', 'images']);

gulp.task('default', [
  'build',
  'watchStyles',
  'watchTemplates',
  'connect',
]);
