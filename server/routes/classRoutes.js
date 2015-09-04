var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;

var sendResponse = function (res) {
  return function (data) {
    res.status(200).send(data);
  };
};

router.get('/', function (req, res) {
  Class.findAll({
    where: {
      TeacherId: req.body.TeacherId
    }
  }).then(sendResponse(res));
});

router.post('/', function (req, res) {
  Class
    .create(req.body)
    .then(sendResponse(res));
});

module.exports = router;