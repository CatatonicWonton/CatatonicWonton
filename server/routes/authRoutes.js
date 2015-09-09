var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var passport = require('passport');
// var localstrategy


var createAccount = function (req, res, next) {
  var accountType = req.body.accountType;
  var username = req.body.username;

  Utils
    .findUsername(username)
    .spread(function (user) {
      if (!user) {
        Models[accountType]
          .create(req.body);
        next();
      } else {
        res.send('Username is already taken!');
      }
    })
};

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.post('/signup',
  createAccount,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

module.exports = router;