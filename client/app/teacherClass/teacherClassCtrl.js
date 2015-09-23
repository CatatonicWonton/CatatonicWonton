angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, HelpRequest, User, Class, Notification){
    
    // MODEL
    $scope.user = User.getUserObj();

    // Gets specific class
    $scope.getClass = function() {
      Class.getClass().then(function (myClass){
        $scope.teacherClass = myClass;
        console.log(myClass);
      });
    };

    // Get specific class each time page loads
    $scope.getClass();
    console.log('teacherClassCtrl ran');
    // CLASS SOCKETS
    Class.establishClassSocket($scope, function() {
      $scope.getClass();
      console.log('returns class socket');    
    });

    // HELP REQUEST SOCKETS

    HelpRequest.establishHelpRequestSocket($scope, function() {
      HelpRequest.refreshRequests().then(function (requests) {
        User.getStudent(requests[0].StudentId).then(function (studentData) {
          var studentName = studentData.firstName + ' ' + studentData.lastName;
          Notification.warning({
            title: studentName,
            message: requests[0].question,
          });
        })
      })
    });

  });
  