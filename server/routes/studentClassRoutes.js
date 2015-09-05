var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;

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

// posts a student in a class
router.post('/:id', function (req, res) {
  Class.findById(req.params.id)
    .then(function (foundClass) {
      return Student.findById(req.body.StudentId).then(function (student) {
        return foundClass.addStudent(student);
      });
    })
    .then(sendResponse(res));
});

// deletes a student from 1 particular
router.put('/:id', function (req, res) {
  StudentClass.findOne({
      where: {
        ClassId: req.params.id,
        StudentId: req.body.StudentId
      }
    })
    .then(function (studentClass) {
      return studentClass.destroy();
    })
    .then(sendResponse(res));
});


module.exports = router;