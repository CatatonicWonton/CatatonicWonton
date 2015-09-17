var Promise = require('bluebird');

var Student = require('./db.js').Models.Student;
var Teacher = require('./db.js').Models.Teacher;
var HelpRequest = require('./db.js').Models.HelpRequest;

var socketHandler = function(server) {
  // associate our server with the socket.io library
  var io = require('socket.io')(server);
  
  var classSocket = io.of('/classSocket');
  var helpRequestSocket = io.of('/helpRequest');

  // create namespace for classSocket
  classSocket.on('connection', function(socket) {
    socket.on('update', function(data) {
      if(data.studentId) {
        Student
          .upsert({
            id: data.studentId,
            currentProject: data.project,
            currentPage: data.page
          })
          .then(function() {
            socket.broadcast.emit('teacherUpdate', data);
            console.log('teacherUpdate emit fired', data);
          })
      }
    });
  });

  helpRequestSocket.on('connection', function(socket) {
    console.log('connected to request handler');
    // set listener for student submitting questions
    socket.on('submitted', function(submission) {
      /*submission e.g. = { studentId: 'asdf',
        teacherId: 1,
        acknowledged: false,
        resolved: false } */

      HelpRequest
        .create({
          StudentId: submission.studentId,
          TeacherId: submission.teacherId,
          question: submission.question,
          acknowledged: false,
          resolved: false
        })
        .then(function() {
          socket.broadcast.emit('teacherHelpRequest', submission);
          console.log('teacherHelpRequest emit fired', submission);
        })


      // ***insert logic from helpRequestController***
      // write line in help request table with the question, student and teacherId and acknowledge and resolved are equal to false
      
      // let teacher know about students question
      socket.broadcast.emit('teacherHelpRequest', submission);
    });

    // set listener for when a teacher acknowledges request
    socket.on('acknowledged', function(studentId) {
      // modify the table set acknowledged equal to true
    });

    // set listener for when teacher resolves request
    socket.on('resolved', function(studentId) {
      // *** use logic from controller***
      // set resolved to equal
    })
  })
};

module.exports = socketHandler;