var Student = require('./db.js').Models.Student;

var classSocket = function(app, server) {
  var io = require('socket.io')(server);  


  io.of('/classSocket').on('connection', function(socket) {

    console.log('this is classSocket connection');

    socket.on('shoot', function(data) {
      status.user = data;
      socket.emit('working', status);
    });

    socket.on('update', function(data) {
      // update the current user's id
      // Student
      //   .upsert({
      //     id: data.studentId,
      //     currentProject: data.project,
      //     currentPage: data.page
      //   })
      //   .then(function() {
      //     Student.findAll({
      //       where: {
      //         classId: 1
      //       }
      //     }).then(function(status) {
      //       console.log('Status: ', status)
      //       socket.emit('teacherUpdate', status);
      //     })
      //   })

    })
  });

  // io.of('/helpRequest').on('connection', function() {

  // })
};

module.exports = classSocket;