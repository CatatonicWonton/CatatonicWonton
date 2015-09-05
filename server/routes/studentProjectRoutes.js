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

// teacher assigning / unassigning project to an entire class(es)
// teacher assigning / unassigning to specific students in a class 

// router.post('/student/:id', function (req, res) {
//   StudentProject
//     .create({
//       StudentId: req.params.id,
//       ProjectId: req.body.ProjectId
//     })
//     .then(sendResponse(res));
// });

// posts a student in a class
// router.post('/:id', function (req, res) {
//   Class.findById(req.params.id)
//     .then(function (foundClass) {
//       return Student.findById(req.body.StudentId).then(function (student) {
//         return foundClass.addStudent(student);
//       });
//     })
//     .then(sendResponse(res));
// });

router.post('/student/:id', function (req, res) {
  Student.findById(req.params.id)
    .then(function (student) {
      return Project.findById(req.body.ProjectId).then(function (project) {
        return student.addProject(project);
      });
    })
    .then(sendResponse(res));
});


router.post('/class/:id', function (req, res) {
  Class.findById(req.params.id)
    .then(function (foundClass) {
      return console.log(foundClass.getStudents());
    })
    .then(sendResponse(res));
});

router.delete('/student/:id', function (req, res) {
  StudentProject.findOne({
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

router.delete('/class/:id', function (req, res) {
  
});


// posts a student in a class
router.post('/:id', function (req, res) {
  Class.findById(req.params.id)
    .then(function (foundClass) {
      return Student.findById(req.body.StudentId).then(function (student) {
        return foundClass.addStudent(student);
      });
    })
    .then(sendResponse(res));
});

// deletes a student from 1 particular class
router.delete('/:id', function (req, res) {
  StudentClass.findOne({
      where: {
        ClassId: req.params.id,
        StudentId: req.body.StudentId
      }
    })
    .then(function (studentClass) {
      return studentClass.destroy();
    })
    .then(sendResponse(res));
});


module.exports = router;