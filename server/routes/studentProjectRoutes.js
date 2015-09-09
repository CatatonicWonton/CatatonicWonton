var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Project = Models.Project;
var Student = Models.Student;
var StudentProject = Models.StudentProject;

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

// teacher can assign a project to a student
router.post('/student/:id', function (req, res) {
  Promise.all([
    Student
      .findById(req.params.id),

    Project
      .findById(req.body.ProjectId)
  ])
  .spread(function (student, project) {
    return student.addProject(project);
  })
  .then(sendResponse(res));
});

// teacher can assign projects to a class
router.post('/class/:id', function (req, res) {
  Promise.all([
    Project
      .findById(req.body.ProjectId),

    Class
      .findById(req.params.id)
  ])
  .spread(function (project) {

  })

  Class
    .findById(req.params.id)
    .then(function (foundClass) {
      return Promise.all([
        foundClass
          .getStudents(),

        Project
          .findById(req.body.ProjectId)
      ])
    })
    .spread(function (students, project) {
      students.forEach(function (student) {
        student.addProject(project);
      });
    })
});

// teacher can unassign a project from a student
router.delete('/student/:id', function (req, res) {
  StudentProject
    .findOne({
      where: {
        StudentId: req.params.id,
        ProjectId: req.body.ProjectId
      }
    })
    .then(function (studentProject) {
      return studentProject.destroy();
    })
    .then(sendResponse(res));
});

// teacher can unassign projects from a class
router.delete('/class/:id', function (req, res) {
  Class
    .findById(req.params.id)
    .then(function (foundClass) {
      return foundClass.getStudents();
    })
    .then(function (students) {
      students.forEach(function (student) {
        StudentProject.findOne({
          where: {
            StudentId: student.id,
            ProjectId: req.body.ProjectId  
          }
        }).then(function(studentProject) {
          return studentProject.destroy();
        })
      })
    });
});

module.exports = router;