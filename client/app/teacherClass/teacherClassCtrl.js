angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, HelpRequest, User, Class, Notification){
    
    // MODEL
    $scope.user = User.getUser();

    // Gets specific class
    $scope.getClass = function() {
      Class.getClass().then(function (myClass){
        $scope.teacherClass = myClass;
      });
    };

    // Get specific class each time page loads
    $scope.getClass();

    // CLASS SOCKETS
    Class.establishClassSocket($scope, function() {
      $scope.getClass();      
    });

    // HELP REQUEST SOCKETS

    HelpRequest.establishHelpRequestSocket($scope, function (data) {
      HelpRequest.refreshRequests().then(function (requests) {
        var i = requests.length - 1;
        
        User.getStudent(requests[i].StudentId).then(function (studentData) {
        
          var studentName = studentData.firstName + ' ' + studentData.lastName;
          
          Notification.warning({
            title: studentName,
            message: requests[i].question,
          });

        })
      })
    });

    // send acknowledgement
    $scope.acknowledgeRequest = function(studentId) {
      HelpRequest.acknowlegeRequest(studentId);
    };

    // send resolution
    $scope.resolveRequest = function(studentId) {
      HelpRequest.resolveRequest(studentId);
    };

  });
  