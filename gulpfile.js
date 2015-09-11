/*

installation
  -npm and bower install
  -database setup
testing
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
var nodemon = require('gulp-nodemon');
var shell = require('gulp-shell')
var jshint = require('gulp-jshint');
var csslint = require('gulp-csslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
 
// Install dependencies
gulp.task('install', shell.task([
  'npm install',
  'bower install'
]));

// gulp.task('serveprod', function() {
//   connect.server({
//     root: [your_project_path],
//     port: process.env.PORT || 5000, // localhost:5000
//     livereload: false
//   });
// });


// TODO
// // Create the DB
// gulp.task('writeDB', shell.task([
//   'mysql -u root'
//   'create database schoolio;',
//   'exit',
//   'node server/makeData.js',
// ]));

gulp.task('startServer', function () {
  nodemon({
    script: 'server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
});

// Lint Task
// JS
gulp.task('jslint', function() {
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
// JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('client/**', ['jslint', 'csslint', 'scripts']);
});

// Default Task
gulp.task('default', ['jslint', 'csslint', 'scripts', 'watch']);



