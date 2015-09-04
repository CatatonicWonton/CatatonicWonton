var express = require('express');
var router = express.Router();
var Sequelize = require('Sequelize');
var sequelize = require('../db.js').database;
var Models = require('../db.js').Models;

// Models
var Project = Models.Project; 
var Page = Models.Page;
var Teacher = Models.Teacher;

var sendResponse = function (res) {
  return function (data) {
    res.status(200).send(data);
  };
};

router.get('/', function (req, res) {
  Project.findAll({
    where: {
      TeacherId: req.body.TeacherId
    },
    include: [
      { 
        model: Page 
      }
    ]
  })
  .then(sendResponse(res));
});

router.post('/', function (req, res) {
  Project
    .create({
      name: req.body.name,
      subject: req.body.subject
    })
    .then(function (project) {
      return Teacher.findById(1).then(function (teacher) {
        return project.setTeacher(teacher);
      });
    })
    .then(sendResponse(res));
}); 

module.exports = router;