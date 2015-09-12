var Models  = require('../db.js').Models;
var Promise = require('bluebird');
var Utils   = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Teacher     = Models.Teacher;
var Student     = Models.Student;
var HelpRequest = Models.HelpRequest;

module.exports = {
  addQuestion: function(req, res, next) {
    // var student = req.session.passport.user;
    var _studentId = req.body.studentId;

    // create function in angular to store teacherId
    // send in the id of the teacher from the client
    var _teacherId = req.body.teacherId;

    Promise
      .all([
        HelpRequest
          .create({
            question: req.body.question
          }),

        Student
          // .findById(student._id),
          .findById(_studentId),

        Teacher
          .findById(_teacherId)
      ])
      .spread(function (helpRequest, student, teacher) {
        helpRequest.setStudent(student);
        return helpRequest.setTeacher(teacher);
      })
      .then(helpers.sendResponse(res));
  },

  toggleTrue: function(req, res, next) {
    HelpRequest
      .findById(req.params.helpRequestId)
      .then(function (helpRequest) {
        helpRequest[req.params.prop] = true;
        helpRequest.save();
      })
      .then(helpers.sendResponse(res));
  },
  getUnresolved: function(req, res, next) {
    HelpRequest
      .findAll({
        where: {
          resolved: false,
        },
        order: [
          ['acknowledged', 'ASC'],
          ['createdAt', 'ASC']
        ]
      })
      .then(helpers.sendResponse(res))
  },
  deleteRequest: function (req, res, next) {
    HelpRequest
      .findById(req.params.id)
      .then(function (helpRequest) {
        return helpRequest.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};












