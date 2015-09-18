angular.module('app')
  .factory('HelpRequest', function Project($http, $stateParams, socketFactory) {

    // make a socket for help requests
    // CLASS SOCKET
    var helpRequestSocket = socketFactory({
      ioSocket: io.connect('http://127.0.0.1:8000/helpRequest')
    });

    var establishHelpRequestSocket = function(scope, cb) {
      helpRequestSocket.forward('teacherHelpRequest', scope);
      scope.$on('socket:teacherHelpRequest', function(data) {
        cb(data);
      });
    };

    var submitHelpRequest = function(teacherId, studentId, question) {
      helpRequestSocket.emit('submitted', {
        // include the teacher id, student id, question, and ak and res set to false
        studentId: studentId,
        question: question,
        teacherId: teacherId,
        acknowledged: false,
        resolved: false
      });
    };

    var establishAcknowledgedSocket = function(scope, cb) {
      helpRequestSocket.forward('teacherIsComing', scope);
      scope.$on('socket:teacherIsComing', function(data) {
        console.log('teacher is coming from helprequest.js on line 31');
        console.log('data is:', data)
        cb(data);
      });
    };

    var acknowledge = function(studentId) {
      helpRequestSocket.emit('acknowledged', {studentId: studentId});
    };

    // var resolveRequest = function(studentId) {
    //   helpRequestSocket.emit('resolved', studentId);
    // };

    /* Teacher can toggle request properties, acknowledged and resolved */
    var toggleRequest = function(helpRequestId, prop) {
      var requestData = {helpRequestId: helpRequestId};
      var url = '/api/helpRequests/' + helpRequestId + '/' + prop;

      return $http.post(url, requestData).then(function(response){
        // TODO: send a socket event to the student that the teacher
        //       has acknowledge the request and is coming
        return response.data;
      });
    };

    // Called when teacher receives "new!" socket event
    /* Teacher can get a list of unresolved projects in ascending order by dateCreated */
    var refreshRequests = function() {
      return $http.get('/api/helpRequests').then(function (response){
        return response.data;
      });
    };

    return {
      establishHelpRequestSocket: establishHelpRequestSocket,
      establishAcknowledgedSocket: establishAcknowledgedSocket,
      acknowledge: acknowledge,
      submitHelpRequest: submitHelpRequest,
      toggleRequest: toggleRequest,
      refreshRequests: refreshRequests
    };
  });


