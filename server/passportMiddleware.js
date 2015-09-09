var LocalStrategy = require('passport-local').Strategy;
var db = require('./db.js');
var Promise = require('bluebird');
var Models = db.Models;
var Utils = require('./utilities.js');

module.exports = function (passport) {
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
};