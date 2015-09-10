var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;


// gets a student
router.get('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Student
    .findById(req.params.id)
    .then(helpers.sendResponse(res));
});

// create a student
router.post('/', function (req, res) {
  Student
    .create(req.body)
    .then(helpers.sendResponse(res));
});

// edit a student
router.put('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Student
    .upsert(Utils.extend(req.body, {id: req.params.id}))
    .then(function () {
      return Student.findById(req.params.id);
    })
    .then(helpers.sendResponse(res));
});

// delete a student
router.delete('/:id', helpers.checkIf('Teacher'), function (req, res) {
  Student
    .findById(req.params.id)
    .then(function (student) {
      return student.destroy();
    })
    .then(helpers.sendResponse(res));
});

module.exports = router;