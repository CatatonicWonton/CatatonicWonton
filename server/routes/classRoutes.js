var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;

// get a single class
router.get('/:id', function (req, res) {
  Class
    .find({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Student
        }
      ]
    })
    .then(helpers.sendResponse(res));
});

// get all classes
router.get('/', function (req, res) {
  var user = req.session.passport.user;

  if (user.accountType === 'Teacher') {
    Class
      .findAll({
        where: {
          TeacherId: user._id
        }
      })
      .then(helpers.sendResponse(res));
  } else {
    StudentClass
      .findAll({
        where: {
          StudentId: user._id
        }
      })
      .then(helpers.sendResponse(res));
  }
});

// create a class
router.post('/', helpers.checkIf('Teacher'), function (req, res) {
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
    .then(helpers.sendResponse(res));
});

// delete a class
router.delete('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Class
    .findById(req.params.id)
    .then(function (foundClass) {
      return foundClass.destroy();
    })
    .then(helpers.sendResponse(res));
});

module.exports = router;