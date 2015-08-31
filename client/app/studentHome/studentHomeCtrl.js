angular.module('app')

  /*
    The student home should show all projects, and allow the
    student to click. 
  */
  .controller('studentHomeCtrl', function studentHomeCtrl($scope, projectFactory){
    $scope.projects = projectFactory.projects
  });

