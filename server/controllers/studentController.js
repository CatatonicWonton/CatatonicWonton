var Models = require('../db.js').Models;
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;

module.exports = {
  getStudent: function (req, res, next) {
    Student
      .findById(req.params.id)
      .then(helpers.sendResponse(res));
  },

  createStudent: function (req, res, next) {
    Student
      .create(req.body)
      .then(helpers.sendResponse(res));
  },

  editStudent: function (req, res, next) {
    Student
      .upsert(Utils.extend(req.body, {id: req.params.id}))
      .then(function () {
        return Student.findById(req.params.id);
      })
      .then(helpers.sendResponse(res));
  },

  deleteStudent: function (req, res, next) {
    Student
      .findById(req.params.id)
      .then(function (student) {
        return student.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};