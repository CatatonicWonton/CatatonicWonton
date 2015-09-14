angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, User, Class){
    
    $scope.user = User.getUser();

    // get specific class
    $scope.getClass = function() {
      Class.getClass().then(function(myClass){
        $scope.teacherClass = myClass;
      });
    };

    $scope.getClass();
  });