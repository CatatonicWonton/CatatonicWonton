var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// Models
var Project = Models.Project; 
var Page = Models.Page;
var Teacher = Models.Teacher;
var StudentProject = Models.StudentProject;

module.exports = {
  getProject: function (req, res, next) {
    Project
      .find({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Page
          }
        ]
      })
      .then(helpers.sendResponse(res));
  },

  getUserProjects: function (req, res) {
    var user = req.session.passport.user;
    
    if (user.accountType === 'Teacher') {
      Project
        .findAll({
          where: {
            TeacherId: user._id
          },
          include: [
            { 
              model: Page 
            }
          ]
        })
        .then(helpers.sendResponse(res));
    } else {
      StudentProject
        .findAll({
          where: {
            StudentId: user._id
          }
        })
        .map(function (project) {
          return Project
            .findOne({
              where: {
                id: project.ProjectId
              },
              include: {
                model: Page
              }
            });
        })
        .then(helpers.sendResponse(res));
    }
  },

  createProject: function (req, res, next) {
    var user = req.session.passport.user;

    Promise
      .all([
        Project
          .create({
            name: req.body.name,
            subject: req.body.subject
          }),

        Teacher
          .findById(user._id)
      ])
      .spread(function (project, teacher) { 
        return project.setTeacher(teacher);
      })
      .then(helpers.sendResponse(res));
  },

  editProject: function (req, res, next) {
    Project
      .upsert(Utils.extend(req.body, {id: req.params.id}))
      .then(function () {
        return Project.findById(req.params.id);
      })
      .then(helpers.sendResponse(res));
  },

  deleteProject: function (req, res, next) {
    Project
      .findById(req.params.id)
      .then(function (project) {
        return project.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};