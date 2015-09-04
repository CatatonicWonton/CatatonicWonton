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

var extend = function () {
  var object = {};
  for (var i = 0; i < arguments.length; i++) {
    for (var prop in arguments[i]) {
      object[prop] = arguments[i][prop];
    }
  }
  return object;
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
      return Teacher.findById(req.body.TeacherId).then(function (teacher) {
        return project.setTeacher(teacher);
      });
    })
    .then(sendResponse(res));
}); 

router.get('/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(sendResponse(res));
});

router.put('/:id', function (req, res) {
  Project
    .upsert(extend(req.body, {id: req.params.id}))
    .then(function () {
      return Project.findById(req.params.id);
    })
    .then(sendResponse(res));
}); 

router.delete('/:id', function (req, res) {
  Project
    .findById(req.params.id)
    .then(function (project) {
      return project.destroy();
    })
    .then(sendResponse(res));
})

module.exports = router;