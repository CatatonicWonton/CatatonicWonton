var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;

var sendResponse = function (res) {
  return function (data) {
    res.status(200).send(data);
  };
};

var extend = function () {
  var object = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      object[prop] = arguments[i][prop];
    }
  }
  return object;
};

router.get('/:id', function (req, res) {
  Student.findById(req.params.id)
    .then(sendResponse(res));
});

router.post('/', function (req, res) {
  Student.create(req.body)
    .then(sendResponse(res));
});

router.put('/:id', function (req, res) {
  Student
    .upsert(extend(req.body, {id: req.params.id}))
    .then(function () {
      return Student.findById(req.params.id);
    })
    .then(sendResponse(res));
});

router.delete('/:id', function (req, res) {
  Student.findById(req.params.id)
    .then(function (student) {
      return student.destroy();
    })
    .then(sendResponse(res));
})

module.exports = router;