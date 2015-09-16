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
    var id = req.params.id;

    Promise
      .all([
        Class
          .findById(id),

        Student
          .findById(req.body.StudentId)
      ])
      .spread(function (foundClass, student) {
        return foundClass.addStudent(student);
      })
      .spread(function (studentClass){
        var foundClass = studentClass[0];
        return Class.findOne({
          where: {
            id: foundClass.ClassId
          }
        });
      })
      .then(helpers.sendResponse(res))
      .catch(helpers.sendError(res, 409));
  },
  
  removeStudentFromClass: function (req, res) {
    var classId = req.params.id;

    StudentClass
      .findOne({
        where: {
          ClassId: id,
          StudentId: req.body.StudentId
        }
      })
      .then(function (studentClass) {
        return studentClass.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};