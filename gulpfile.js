var gulp = require('gulp'),
    util = require('gulp-util'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    html2pdf = require('gulp-html2pdf'),
    _ = require('underscore'),
    argv = require('yargs').argv;

gulp.task('pdf', function() {
    return gulp.src('./*.html').pipe(html2pdf({printMediaType: true, pageSize: "letter"})).pipe(gulp.dest('./pdf/'));
});

gulp.task('styles', function() {
    return gulp.src('./scss/**/*.scss').pipe(sass().on('error', sass.logError)).pipe(gulp.dest('./dist/styles/')).pipe(connect.reload());
});

gulp.task('templates', function() {
    return gulp.src('./templates/**/*.jade').pipe(jade({
        locals: {
            company_name: argv.company_name,
            position: argv.position,
            name: argv.name
        },
        pretty: true
    }).on('error', util.log)).pipe(gulp.dest('./dist/')).pipe(connect.reload());
});

gulp.task('images', function() {
  return gulp.src(['images/**/*']).pipe(gulp.dest('dist/images'));
});

gulp.task('watchStyles', function() {
    gulp.watch('./scss/**/*.scss', ['styles']);
});

gulp.task('watchTemplates', function() {
    gulp.watch('./templates/**/*.jade', ['templates']);
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
