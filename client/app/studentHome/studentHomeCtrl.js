angular.module('app')
  .controller('studentHomeCtrl', function studentHomeCtrl($scope, $state, Project){
    
    // PROJECTS
    $scope.getProjects = function() {
      Project.getProjects().then(function(projects){
        console.log(projects);
        $scope.studentProjects = projects;
      });
    };
  
    // pass in projectId from the view
    $scope.goToProject = function(projectId) {
      $state.go('studentProject', {projectId: projectId})
    };

    $scope.getProjects();

  });

