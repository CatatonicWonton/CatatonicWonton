angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, HelpRequest, User, Class){
    
    // keeps teacher up-to-date with students current projects and pages
    var classSocket = Class.getClassSocket();
    
    classSocket.forward('teacherUpdate', $scope);
    $scope.$on('socket:teacherUpdate', function(ev, data) {
      $scope.getClass();
    });

    // get access to the helpRequestSocket
    var helpRequestSocket = HelpRequest.getHelpRequestSocket();

    // send acknowledgement
    $scope.acknowledgeRequest = function(studentId) {
      helpRequestSocket.emit('acknowledged', 1);
    };

    // send resolution
    $scope.resolveRequest = function() {
      helpRequestSocket.emit('resolved', 1);
    };

    // listen for new requests
    helpRequestSocket.forward('teacherHelpRequest', $scope);
    $scope.on('socket:teacherHelpRequest', function(ev, data) {
      // make ui pop up for request with students name and question
    });

    $scope.user = User.getUser();

    // get specific class
    $scope.getClass = function() {
      Class.getClass().then(function(myClass){
        $scope.teacherClass = myClass;
      });
    };

    $scope.getClass();
  });
  