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

  setPropertyOn: function (object, property, value) {
    var property = property.split('.');
    var object = object.session;

    for (var i = 1; i < property.length; i++) {
      object[property[i]] = (i === property.length - 1) ? value : {};
      object = object[property[i]];
    }
  }
};