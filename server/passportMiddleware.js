var LocalStrategy = require('passport-local').Strategy;
var Utils = require('./utilities.js');
var bcrypt = require('bcrypt');

module.exports = function (passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      Utils
        .findUsername(username)
        .spread(function (student, teacher) {
          var user = student || teacher;

          if (!user) {
            return done(null, false, { message: 'Incorrect username' });
          }
          
          bcrypt.compare(password, user.password, function(err, res) {
            if (res) {
              var accountType = {};
              accountType.accountType = student ? 'student' : 'teacher';
              return done(null, Utils.extend(user, accountType));
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
    var sessionUser = {
      _id: user.id,
      accountType: user.accountType,
      username: user.username
    };

    console.log(sessionUser);
    done(null, sessionUser);
  });

  passport.deserializeUser(function(user, done) {
    Utils
      .findUsername(user.username)
      .spread(function (user) {
        return done(null, user);
      })
      .catch(function(err) {
        return done(err);
      });
  });
};