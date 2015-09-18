var Models = require('../db.js').Models;
var Promise = require('bluebird');
var Utils = require('../utilities.js');
var helpers = require('../helpers.js');

// MODELS
var Class = Models.Class;
var Teacher = Models.Teacher;
var Student = Models.Student;
var StudentClass = Models.StudentClass;

module.exports = {
  addStudentToClass: function (req, res) {
    var id = req.params.id;
    console.log('/Adding student: req params');
    console.log(req.params);
    console.log('/Adding student: req body');
    console.log(req.body);

    Promise
      .all([
        Class
          .findById(id),

        Student
          .findById(req.body.StudentId)
      ])
      .spread(function (foundClass, student) {
        return Promise
          .all([
            foundClass.addStudent(student), 
            student
          ]);
      })
      .spread(function (studentClass, student){
        var foundClass = studentClass[0][0];
        return Class.findOne({
          where: {
            id: foundClass.ClassId
          }
        })
        .then(function (_class){
          console.log('\n\n\nFound _class');
          return _class.getProjects()
            .map(function(project){
              project.addStudent(student);
            })
            .then(function(){
              console.log('Got through adding projects')
              return _class;
            });
        })
        .catch(function(error){
          console.log(error);
          throw error;
        });
      })
      .then(helpers.sendResponse(res))
      .catch(helpers.sendError(res, 409));
  },
  
  removeStudentFromClass: function (req, res) {
    var classId = req.params.id;

    StudentClass
      .findOne({
        where: {
          ClassId: id,
          StudentId: req.body.StudentId
        }
      })
      .then(function (studentClass) {
        return studentClass.destroy();
      })
      .then(helpers.sendResponse(res));
  }
};