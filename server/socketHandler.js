var fs = require('fs');
var status = {};

var classSocket = function(app, server) {
  var io = require('socket.io')(server);  


  io.of('/classSocket').on('connection', function(socket) {

    console.log('this is classSocket connection');
    socket.emit('working', status);

    socket.on('shoot', function(data) {
      status.user = data;
      socket.emit('working', status);
    });

    socket.on('update', function(data) {
      console.log('This data:', data);

      // read the current file
      fs.readFile('/test.txt', function(err, d) {
        console.log('That data:', d);
        fs.writeFile('/test', data, function() {
          console.log('success');
        });
      });

      // take the old info and add the ne

      status[data.studentId] =  {
        project: data.project,
        page: data.page
      };
      socket.emit('teacherUpdate', status);
    })
  });

  // io.of('/helpRequest').on('connection', function() {

  // })
};

module.exports = classSocket;