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

// get a single class
router.get('/:id', function (req, res) {
  Class.findById(req.params.id)
    .then(sendResponse(res));
});

// get all classes
router.get('/', function (req, res) {
  Class.findAll({
    where: {
      TeacherId: req.body.TeacherId
    }
  }).then(sendResponse(res));
});

// create a class
router.post('/', function (req, res) {
  Class
    .create({
      name: req.body.name
    })
    .then(function (classModel) { 
      return Teacher.findById(req.body.TeacherId)
        .then(function (teacher) {
          return classModel.setTeacher(teacher);
        });
    })
    .then(sendResponse(res));
});

// delete a class
router.delete('/:id', function (req, res) {
  Class.findById(req.params.id)
    .then(function (foundClass) {
      return foundClass.destroy();
    })
    .then(sendResponse(res));
});

module.exports = router;