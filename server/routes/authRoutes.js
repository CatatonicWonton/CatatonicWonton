var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var passport = require('passport');
var bcrypt = require('bcrypt');


var createAccount = function (req, res, next) {
  var accountType = req.body.accountType;
  var username = req.body.username;

  req.body.salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(req.body.password, req.body.salt);

  Utils
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
};

var logout = function (req, res, next) {
  req.session.destroy();
  req.logout();
  next();
};

var success = function (req, res, next) {
  res.status(200).send(true);
  next();
};

router.post('/login', passport.authenticate('local'), function (req, res, next) {
  res.status(200).send(req.session.passport.user);
});

router.post('/signup', createAccount, success);

// sign out
router.post('/logout', logout);

module.exports = router;