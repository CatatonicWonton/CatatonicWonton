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
          })
      }
    });
  });

  helpRequestSocket.on('connection', function(socket) {
    // set listener for student submitting questions
    socket.on('submitted', function(submission) {
      if(submission.studentId) {
        HelpRequest
          .create({
            StudentId: submission.studentId,
            TeacherId: submission.teacherId,
            projectName: submission.projectName,
            question: submission.question,
            acknowledged: false,
            resolved: false
          })
          .then(function() {
            socket.broadcast.emit('teacherHelpRequest', submission);
          });
      }
    });

    socket.on('acknowledged', function (question) {
      socket.broadcast.emit('teacherIsComing');
    });
  })
};

module.exports = socketHandler;