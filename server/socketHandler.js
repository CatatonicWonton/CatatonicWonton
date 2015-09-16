var Student = require('./db.js').Models.Student;

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
    socket.on('submitted', function(studentInfo) {
      // ***insert logic from helpRequestController***
      // write line in help request table with the question, student and teacherId and acknowledge and resolved are equal to false
      
      // let teacher know about students question
      socket.broadcast.emit('teacherHelpRequest', studentInfo);
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