/*

installation
  -npm and bower install
  -TODO: database setup (extra)
TODO: testing
  -front-end testing
  -back-end testing
build
  -linting
  -concatination
  -minify and rename files
continuous deployment
  -heroku, azure, aws, or digital ocean

*/

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var nodemon  = require('gulp-nodemon');
var bower    = require('gulp-bower');

var jshint   = require('gulp-jshint');
var csslint  = require('gulp-csslint');

var concat   = require('gulp-concat');
var mocha    = require('gulp-mocha');
var annotate = require('gulp-ng-annotate');
var uglify   = require('gulp-uglify');
var minify   = require('gulp-minify');
var sass     = require('gulp-sass');

// JS HINT
// todo: add server code as well
gulp.task('jshint', function() {
    return gulp.src(['client/app/**/*.js', '!client/app/bower_components/**'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
});

// SERVER TESTS
gulp.task('mocha', function () {
  return gulp.src('server/test/*.js')
    .pipe(mocha({reporter: 'nyan'}));
})

// CSS
gulp.task('csslint', function() {
  gulp.src('client/styles/main.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('client/app/bower_components'));
});

gulp.task('sass', ['bower'], function () {
  gulp.src('client/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/styles'));
});

gulp.task('nodemon', function () {
  nodemon({
    script: 'server/server.js'
  })
});


// Concatenate & Minify
gulp.task('build', function() {
  return gulp.src(['client/app/**/*.js', '!client/app/**/*Spec.js', '!client/app/bower_components/**'])
    .pipe(concat('all.min.js'))
    .pipe(annotate()) // Makes angular safe to minify.
    .pipe(minify()) // Minifies the concatenated js file.
    .pipe(uglify()) 
    .pipe(gulp.dest('build'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('client/**', ['jshint', 'csslint', 'build', 'sass:watch']);
});


// Default Task
gulp.task('default', ['install', 'sass', 'nodemon']);
