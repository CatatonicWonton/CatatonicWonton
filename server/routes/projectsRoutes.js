var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');

// Models
var Project = Models.Project; 
var Page = Models.Page;
var Teacher = Models.Teacher;

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
    .then(sendResponse(res));
});

// get all projects
router.get('/', function (req, res) {
  var user = req.session.passport.user;

  if (user.accountType === 'Teacher') {
    Project.findAll({
      where: {
        TeacherId: user._id
      },
      include: [
        { 
          model: Page 
        }
      ]
    })
    .then(sendResponse(res));
  } else {
    StudentProject.findAll({
      where: {
        StudentId: user._id
      },
      include: [
        { 
          model: Page 
        }
      ]
    })
    .then(sendResponse(res));
  }
});

// create a project
router.post('/', checkIf('Teacher'), function (req, res) {
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
    .then(sendResponse(res));
}); 

// edit a project
router.put('/:id', checkIf('Teacher'), function (req, res) {
  Project
    .upsert(extend(req.body, {id: req.params.id}))
    .then(function () {
      return Project.findById(req.params.id);
    })
    .then(sendResponse(res));
}); 

// delete a project
router.delete('/:id', checkIf('Teacher'), function (req, res) {
  Project
    .findById(req.params.id)
    .then(function (project) {
      return project.destroy();
    })
    .then(sendResponse(res));
})

module.exports = router;