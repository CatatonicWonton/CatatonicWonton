angular.module('app')
  .factory('HelpRequest', function Project($http, $stateParams) {

    // make a socket for help requests
    // CLASS SOCKET
    var helpRequestSocket = socketFactory({
      ioSocket: io.connect('http://127.0.0.1:8000/helpRequest')
    });

    var getHelpRequestSocket = function() {
      return helpRequestSocket;
    };


    /* Student submitting a single help request */
    var submitHelpRequest = function(teacherId, question) {
      var requestData = {teacherId: teacherId, question: question};

      return $http.post('/api/helpRequests', requestData).then(function(response){
        // TODO: send a socket event to the teacher to GET outstanding requests
        return response.data;
      });
    };

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
      return $http.get('/api/helpRequests').then(function(response){
        return response.data;
      });
    };

    return {
      submitHelpRequest: submitHelpRequest,
      toggleRequest: toggleRequest,
      refreshRequests: refreshRequests,
      getHelpRequestSocket: getHelpRequestSocket
    };
  });


