var LocalStrategy = require('passport-local').Strategy;
var Utils = require('./utilities.js');
var bcrypt = require('bcrypt');
var helpers = require('./helpers');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      helpers
        .findUsername(username)
        .spread(function (student, teacher) {
          var user = student || teacher;

          if (!user) {
            return done(null, false, { message: 'Incorrect username' });
          }
          
          bcrypt.compare(password, user.password, function(err, res) {
            if (res) {
              user.accountType = student ? 'Student' : 'Teacher';
              return done(null, user);
            }
            return done(null, false, {message: 'Incorrect password'})
          });
        })
        .catch(function(err) {
          return done(err);
        });
    }
  ));

  passport.serializeUser(function(user, done) {
    console.log(user.username);
    var sessionUser = {
      _id: user.id,
      accountType: user.accountType,
      username: user.username
    };

    return done(null, sessionUser);
  });

  passport.deserializeUser(function(user, done) {
    helpers
      .findUsername(user.username)
      .spread(function (student, teacher) {
        var user = student || teacher;
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
  });
};