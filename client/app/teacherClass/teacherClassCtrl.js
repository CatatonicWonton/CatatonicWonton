angular.module('app')
  .controller('teacherClassCtrl', function teacherClassCtrl($scope, Class){
    // get specific class
    $scope.getClass = function() {
      Class.getClass().then(function(myClass){
        $scope.teachersClass = myClass;
      })
    };

    $scope.getClass();
  });