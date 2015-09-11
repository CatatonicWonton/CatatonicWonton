var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;

module.exports = {
  addStudentToClass: function (req, res) {
    Promise
      .all([
        Class
          .findById(req.params.id),

        Student
          .findById(req.body.StudentId)
      ])
      .spread(function (foundClass, student) {
        return foundClass.addStudent(student);
      })
      .then(helpers.sendResponse(res));
  },
  
  removeStudentFromClass: function (req, res) {
    StudentClass
      .findOne({
        where: {
          ClassId: req.params.id,
          StudentId: req.body.StudentId
        }
      })
      .then(function (studentClass) {
        return studentClass.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};