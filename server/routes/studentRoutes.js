var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Utils = require('../utilities.js');

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

// gets a student
router.get('/:id', Utils.checkIf('Teacher'), function (req, res) {
  Student.findById(req.params.id)
    .then(sendResponse(res));
});

// create a student
router.post('/', function (req, res) {
  Student.create(req.body)
    .then(sendResponse(res));
});

// edit a student
router.put('/:id', Utils.checkIf('Teacher'), function (req, res) {
  Student
    .upsert(extend(req.body, {id: req.params.id}))
    .then(function () {
      return Student.findById(req.params.id);
    })
    .then(sendResponse(res));
});

// delete a student
router.delete('/:id', Utils.checkIf('Teacher'), function (req, res) {
  Student.findById(req.params.id)
    .then(function (student) {
      return student.destroy();
    })
    .then(sendResponse(res));
})

module.exports = router;