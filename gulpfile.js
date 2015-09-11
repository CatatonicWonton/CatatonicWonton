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
var shell    = require('gulp-shell');

var jshint   = require('gulp-jshint');
var csslint  = require('gulp-csslint');

var concat   = require('gulp-concat');
// var rename   = require('gulp-rename');
var annotate = require('gulp-ng-annotate');
var uglify   = require('gulp-uglify');
var minify   = require('gulp-minify');
 
// Install dependencies
gulp.task('install', shell.task([
  'npm install',
  'bower install'
]));

gulp.task('startServer', function () {
  nodemon({
    script: 'server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

// JS HINT
// todo: add server code as well
gulp.task('jshint', function() {
    return gulp.src(['client/app/**/*.js', '!client/app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

// CSS
gulp.task('csslint', function() {
  gulp.src('client/styles/main.css')
    .pipe(csslint())
    .pipe(csslint.reporter())
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
    gulp.watch('client/**', ['jshint', 'csslint', 'build']);
});

// Default Task
gulp.task('default', ['jshint', 'csslint', 'build', 'watch']);
