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
  }
};