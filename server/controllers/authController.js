var Promise = require('bluebird');
var Models = require('../db.js').Models;
var bcrypt = require('bcrypt');
var Utils = require('../utilities');
var helpers = require('../helpers');

module.exports = {

  sendSuccess: function (req, res, next) {
    res.status(200).send(true);
    next();
  },

  checkIf: function (model) {
    return function (req, res, next) {
      if (process.env.NODE_ENV === 'test') {
        Utils.setPropertyOn(req, 'session.passport.user', req.body.user);
        return next();
      }

      if (req.session.passport.user.accountType === model) { 
        return next();
      }

      return res.status(401).send('User must be a ' + model);
    };
  },

  checkIfLoggedIn: function (req, res, next) {
    if (process.env.NODE_ENV === 'test') {
      Utils.setPropertyOn(req, 'session.passport.user', req.body.user);
      next();
    }

    if (req.session && req.session.passport && req.session.passport.user) {
      return next();
    }
    return res.status(401).send('Must be logged');
  },

  createAccount: function (req, res, next) {
    var accountType = req.body.accountType;
    var username = req.body.username;

    req.body.salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(req.body.password, req.body.salt);

    helpers
      .findUsername(username)
      .spread(function (student, teacher) {
        var user = student || teacher;
        if (!user) {
          Models[accountType]
            .create(Utils.extend(req.body, {password: hashedPassword}))
            .then(function(){
              next();
            });
        } else {
          res.send('Username is already taken!');
        }
      });
  },

  logout: function (req, res, next) {
    req.session.destroy();
    req.logout();
    next();
  },

  sendUserData: function (req, res, next) {
    res.status(200).send(req.session.passport.user);
  }
};