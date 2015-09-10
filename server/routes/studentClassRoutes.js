var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;

// add student to a class
router.post('/:id', function (req, res) {
  Promise.all([
    Class
      .findById(req.params.id),

    Student
      .findById(req.body.StudentId)
  ])
  .spread(function (foundClass, student) {
    return foundClass.addStudent(student);
  })
  .then(Utils.sendResponse(res));
});

// deletes student from a class
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
    .then(Utils.sendResponse(res));
});


module.exports = router;