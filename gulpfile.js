var gulp = require('gulp');
var nodemon  = require('gulp-nodemon');
var bower    = require('gulp-bower');
var sass     = require('gulp-sass');

// SERVER TESTS
gulp.task('mocha', function () {
  return gulp.src('server/test/*.js')
    .pipe(mocha({reporter: 'nyan'}));
})

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

gulp.task('default', ['bower', 'sass']);
