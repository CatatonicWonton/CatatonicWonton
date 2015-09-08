var express = require('express');
var db = require('./db.js');
var sequelize = require('sequelize');
var Promise = require('bluebird');
var Models = db.Models;
var Utils = require('./utilities.js');

// Auth
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

app.use(express.static(__dirname + '/../client'));
// middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
app.use(passport.session());

// Authentication
// TODO: sign up

// sign in
passport.use(new LocalStrategy(
  function(username, password, done) {
    Promise
      .some([
        Models.Student.findOne({
          where: {username: username}
        }),
        Models.Teacher.findOne({
          where: {username: username}
        })
      ], 1)
      .spread(function (user) {
        if(!user) {
          return done(null, false, { message: 'Incorrect username or password.' });
        }
        if(user.password === password) { 
          return done(null, user);
        }
      })
      .catch(function(err) { // catches in the event of database failure
        return done(err);
      });
  }
));

// session support
passport.serializeUser(function(user, done) {
  done(null, user.username); // we use ".username" instead of ".id" becuase teacher and student ids can collide
});

passport.deserializeUser(function(username, done) {
  Promise
    .some([
      Models.Student.findOne({
        where: {username: username}
      }),
      Models.Teacher.findOne({
        where: {username: username}
      })
    ], 1)
    .spread(function (user) {
      return done(null, user);
    })
    .catch(function(err) {
      return done(err);
    });
});

function createAccount (req, res) {
  var accountType = req.body.accountType;
  var username = req.body.username;

  Utils
    .findUsername(username)
    .spread(function (user) {
      if (!user) {
        Models[accountType]
          .create(req.body);
      } else {
        res.send('Username is already taken!');
      }
    })
};

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
