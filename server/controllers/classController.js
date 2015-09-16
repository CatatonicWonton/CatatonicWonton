var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;
var Project = Models.Project;

module.exports = {
  getClass: function (req, res) {
    var id = req.params.id;

    Class
      .find({
        where: {
          id: id
        },
        include: [
          {
            model: Student
          },
          {
            model: Project
          }
        ]
      })
      .then(helpers.sendResponse(res));
  },

  getUserClasses: function (req, res) {
    var user = req.session.passport.user;

    if (user.accountType === 'Teacher') {
      Class
        .findAll({
          where: {
            TeacherId: user._id
          },
          include: [
            {
              model: Project
            }
          ]
        })
        .then(helpers.sendResponse(res));
    } else {
      Student
        .findOne({
          where: {
            id: user._id
          }
        })
        .then(function(student){
          return student.getClasses();
        })
        .then(helpers.sendResponse(res));
    }
  },

  getAllClasses: function (req, res) {
    var user = req.session.passport.user;

    if(user.accountType !== 'Student') {
      helpers.sendError(res, 404)('You are not a student');
    } else {
      Class
        .findAll()
        .then(helpers.sendResponse(res));
    }
  },

  createClass: function (req, res) {
    var user = req.session.passport.user;

    Promise
      .all([
        Class
          .create({
            name: req.body.name
          }),
          
        Teacher
          .findById(user._id)
      ])
      .spread(function (newClass, teacher) {
        return newClass.setTeacher(teacher);
      })
      .then(helpers.sendResponse(res))
      .catch(helpers.sendError(res, 409));
  },

  deleteClass: function (req, res) {
    var classId = req.params.id;

    Class
      .findById(classId)
      .then(function (foundClass) {
        return foundClass.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};