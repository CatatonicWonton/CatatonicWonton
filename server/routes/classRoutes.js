var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;

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
    .then(sendResponse(res));
});

// get all classes
router.get('/', function (req, res) {
  var user = req.session.passport.user;
  console.log(user);
  if (user.accountType === 'Teacher') {
    Class
      .findAll({
        where: {
          TeacherId: user._id
        }
      })
      .then(sendResponse(res));
  } else {
    StudentClass
      .findAll({
        where: {
          StudentId: user._id
        }
      })
      .then(sendResponse(res));
  }
});

// create a class
router.post('/', Utils.checkIf('Teacher'), function (req, res) {
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
    .then(sendResponse(res));
});

// delete a class
router.delete('/:id', Utils.checkIf('Teacher'), function (req, res) {
  Class
    .findById(req.params.id)
    .then(function (foundClass) {
      return foundClass.destroy();
    })
    .then(sendResponse(res));
});

module.exports = router;