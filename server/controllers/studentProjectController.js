var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var Project = Models.Project;
var StudentClass = Models.StudentClass;
var StudentProject = Models.StudentProject;

module.exports = {
  assignProjectToStudent: function (req, res, next) {
    Promise
      .all([
        Student
          .findById(req.params.id),

        Project
          .findById(req.body.ProjectId)
      ])
      .spread(function (student, project) {
        return student.addProject(project);
      })
      .then(helpers.sendResponse(res));
  },

  assignProjectToClass: function (req, res, next) {
    Class
      .findById(req.params.id)
      .then(function (foundClass) {
        return Promise.all([
          foundClass
            .getStudents(),

          Project
            .findById(req.body.ProjectId)
            .then(function(project){
              project.addClass(foundClass);
              return project;
            }),

          foundClass
        ])
      })
      .spread(function (students, project, foundClass) {
        return Promise
          .all(
            Promise
              .map(students, function (student) {
                return student.addProject(project);
              }),
              foundClass
          );
      })
      .then(helpers.sendResponse(res));
  },

  unassignProjectFromStudent: function (req, res) {
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
      .then(helpers.sendResponse(res));
  },

  unassignProjectFromClass: function (req, res) {
    Class
      .findById(req.params.id)
      .then(function (foundClass) {
        return foundClass.getStudents();
      })
      .then(function (students) {
        return Promise
          .map(students, function (student) {
            return StudentProject
              .findOne({
                where: {
                  StudentId: student.id,
                  ProjectId: req.body.ProjectId
                }
              })
              .then(function (studentProject) {
                return (studentProject) ? studentProject.destroy() : null;
              })
          });
      })
      .then(helpers.sendResponse(res));
  }
};