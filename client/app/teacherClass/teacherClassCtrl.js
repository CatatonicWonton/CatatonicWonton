angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, HelpRequest, User, Class){
    
    // MODEL
    $scope.user = User.getUser();

    // Gets specific class
    $scope.getClass = function() {
      Class.getClass().then(function(myClass){
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
    HelpRequest.establishHelpRequestSocket($scope, function(data) {
      // what you want to do when you get a help request

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
  