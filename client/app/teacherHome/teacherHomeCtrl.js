angular.module('app')
  .controller('teacherHomeCtrl', function teacherHomeCtrl($scope){
    $scope.teacherProjects = [];
    $scope.addProject = function() {
      console.log('hey');
    };
  });