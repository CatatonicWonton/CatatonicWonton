angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, User, Class){
    
    var classSocket = Class.getClassSocket();
    
    // classSocket.forward('working', $scope);
    // $scope.$on('socket:working', function (ev, data) {
    //   console.log('seems to work!', data);
    //   $scope.theData = data;
    // });

    // $scope.test = function() {
    //   classSocket.emit('shoot', 'Jose');
    // };

    classSocket.forward('teacherUpdate', $scope);
    $scope.$on('socket:teacherUpdate', function(ev, data) {
      console.log('Current class data:', data);
      $scope.studentStatus = data;
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
  