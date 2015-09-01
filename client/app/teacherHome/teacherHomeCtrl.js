angular.module('app')
  .controller('teacherHomeCtrl', function teacherHomeCtrl($scope, projectFactory){
    
    // this is the array of current project for this teacher
    $scope.teacherProjects = projectFactory.projects;
    
    $scope.addProject = function() {
      console.log('add new project:', projectFactory.projects);
      // launch modal that gathers information about new project
        // add new information to current teacher's project data
      // transition to 'teacherProject' view with new information
    };
    $scope.editProject = function(index) {
      console.log('Edit this project:', $scope.teacherProjects[index]);
      // transition state to the selected projects edit view
    }

  });