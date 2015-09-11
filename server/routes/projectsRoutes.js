var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// Models
var Project = Models.Project; 
var Page = Models.Page;
var Teacher = Models.Teacher;
var StudentProject = Models.StudentProject;

// get a project
router.get('/:id', function (req, res) {
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
});

// get all projects
router.get('/', function (req, res) {
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
});

// create a project
router.post('/', helpers.checkIf('Teacher'), function (req, res) {
  Promise
    .all([
      Project
        .create({
          name: req.body.name,
          subject: req.body.subject
        }),

      Teacher
        .findById(req.session.passport.user._id)
    ])
    .spread(function (project, teacher) { 
      return project.setTeacher(teacher);
    })
    .then(helpers.sendResponse(res));
}); 

// edit a project
router.put('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Project
    .upsert(Utils.extend(req.body, {id: req.params.id}))
    .then(function () {
      return Project.findById(req.params.id);
    })
    .then(helpers.sendResponse(res));
}); 

// delete a project
router.delete('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Project
    .findById(req.params.id)
    .then(function (project) {
      return project.destroy();
    })
    .then(helpers.sendResponse(res));
})

module.exports = router;