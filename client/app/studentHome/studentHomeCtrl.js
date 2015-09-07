angular.module('app')

  .controller('studentHomeCtrl', function studentHomeCtrl($scope, Project){
    
// PROJECTS
    $scope.getProjects = function() {
      Project.getProjects().then(function(projects){
        $scope.projects = projects;
      });
    };
                                  // pass in projectId from the view
    $scope.goToProject = function(projectId) {
      $state.go('studentProject', {projectId: projectId})
    };

    $scope.getProjects();

  });

