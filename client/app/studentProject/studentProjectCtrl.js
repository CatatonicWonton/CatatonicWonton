angular.module('app')
  .controller('studentProjectCtrl', function studentProjectCtrl($scope){

      // todo: organize methods by category

      // PROJECT
      $scope.getProject = function() {
        Project.getProject().then(function(project){
          $scope.project = project;
        });
      };




      // EXTRA: student input
      $scope.answerQuestion = function() {

      };

  });