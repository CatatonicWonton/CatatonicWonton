var Promise = require('bluebird');
var Models = require('./db').Models;
var sequelize = require('Sequelize');

module.exports = {
  extend: function () {
    var object = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        object[prop] = arguments[i][prop];
      }
    }
    return object;
  },

  sendResponse: function (res) {
    return function (data) {
      res.status(200).send(data);
    };
  },

  findUsername: function (username) {
    return Promise
      .some([
        Models.Student.findOne({
          where: {username: username}
        }),
        Models.Teacher.findOne({
          where: {username: username}
        })
      ], 2)
  },

  // ROUTE HANDLERS
  checkIf: function (model) {
    return function (req, res, next) {
      if (req.session.passport.user.accountType === model) { 
        next();
      }
    };
  }
};