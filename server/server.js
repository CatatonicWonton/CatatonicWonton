var express = require('express');
var db = require('./db.js');
var sequelize = require('sequelize');
var Promise = require('bluebird');

// Auth
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// Auth models
var StudentModel = db.Models.Student;
var TeacherModel = db.Models.Teacher;


// middleware
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// ROUTE HANDLER
var classRoutes          = require('./routes/classRoutes');
var pageRoutes           = require('./routes/pageRoutes');
var projectsRoutes       = require('./routes/projectsRoutes');
var studentRoutes        = require('./routes/studentRoutes');
var studentClassRoutes   = require('./routes/studentClassRoutes');
var studentProjectRoutes = require('./routes/studentProjectRoutes');

var app = express();

// app.use(bodyParser.urlencoded({extended: true}));

// passport middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication

// TODO: sign up


// sign in
Promise
  .some([
    StudentModel.findOne({
      where: {username: username}
    }),
    TeacherModel.findOne({
      where: {username: username}
    })
  ], 1)
  .then(function (user) {
    if(user.password === password) {
      return done(null, user);
    }
    return done(null, false, { message: 'Incorrect password.' });
  })
  .catch(AggregateError, function(err) {
    return done(null, false, { message: 'Incorrect username.' });
  });

passport.use(new LocalStrategy(
  function(username, password, done) {
    Promise
      .some([
        StudentModel.findOne({
          where: {username: username}
        }),
        TeacherModel.findOne({
          where: {username: username}
        })
      ], 1)
      .then(function (user) {
        if(user.password === password) { // ???
          return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password.' });
      })
      .catch(AggregateError, function(err) {
        return done(null, false, { message: 'Incorrect username.' });
      });
  }
));

app.use(express.static(__dirname + '/../client'));

// Define Routes
app.use('/api/class', classRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/studentClass', studentClassRoutes);
app.use('/api/studentProject', studentProjectRoutes);

app.listen(8000, function () {
  console.log('listening on port 8000');
});
