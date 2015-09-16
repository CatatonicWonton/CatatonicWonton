angular.module('app')
  .factory('Class', function Class($http, $stateParams, User, socketFactory) {

    // CLASS SOCKET
    var myIoSocket = io.connect('http://127.0.0.1:8080/classSocket');
    mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    var getClassSocket = function() {
      return mySocket;
    };

    var updateStudentStatus = function(project, page) {
      mySocket.emit('update', {
        project: project,
        page: page,
        studentId: User.getUser()._id
      });
    };

    var getClasses = function() {
      return $http.get('/api/class').then(function(response){
        return response.data;
      });
    };

    var getAllClasses = function() {
      return $http.get('/api/class/all').then(function(response){
        return response.data;
      });
    };



    var getClass = function() {
      return $http.get('/api/class/' + $stateParams.classId).then(function(response) {
        console.log('Current class:', response.data);
        return response.data;
      });
    };

    var createClass = function(className) {
      return $http.post('/api/class/', {name: className})
        .then(function(response) {
          return response.data.id;
        })
        .catch(function(error) {
          console.log("Error: ");
          console.log(error);
          throw error;
        });
    };

    var deleteClass = function(classId) {
      return $http.delete('/api/class/' + classId).then(function(response) {
        return response.data;
      });
    };

    var joinClass = function(classId) {
      var studentId = User.getUser()._id;
      return $http.post('api/studentClass/' + classId, {
        StudentId: studentId
      }).then(function(response){
        return response.data;
      }).catch(function(error){
        throw error;
      });
    };

    return {
      getClasses: getClasses,
      getAllClasses: getAllClasses,
      getClass: getClass,
      createClass: createClass,
      deleteClass: deleteClass,
      joinClass: joinClass,
      getClassSocket: getClassSocket,
      updateStudentStatus: updateStudentStatus
    };

  });
     



