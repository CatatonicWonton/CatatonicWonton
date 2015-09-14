angular.module('app')
  .controller('teacherHomeCtrl', function teacherHomeCtrl($scope, $state, $modal, Class, Project) {

    // PROJECTS
    $scope.getProjects = function() {
      Project.getProjects().then(function(projects) {
        $scope.teacherProjects = projects;
      });
    };

    // used as a store for dropdown toggle info, see ng-init in view
    $scope.dropdowns = {};

    $scope.goToProject = function(projectId) {
      $state.go('teacherProject', {
        projectId: projectId
      });
    };

    $scope.modalOpen = function(title, inputArray, callback) {
      var modalInstance = $modal.open({
        templateUrl: 'app/teacherHome/newProjectModal.html',
        controller: function($scope, $modalInstance) {
          $scope.modaltitle = title;
          $scope.inputArray = inputArray;
          $scope.storage = [];

          $scope.ok = function() {
            $modalInstance.close($scope.storage);
          };

          $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
          };
        }
      });

      modalInstance.result.then(function(argsArray) {
        callback.apply(null, argsArray);
      }, function() {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

    $scope.createProject = function(name, subject, author) {
      Project.createProject(name, subject, author).then(function(projectId) {
        $scope.goToProject(projectId);
      });
    };


    // CLASSES
    $scope.getClasses = function() {
      Class.getClasses().then(function(classes) {
        $scope.teacherClasses = classes;
      });
    };

    $scope.goToClass = function(classId) {
      $state.go('teacherClass', {
        classId: classId
      });
    };

    $scope.createClass = function(name) {
      Class.createClass(name).then(function(classId) {
        $scope.goToClass(classId);
      });
    };

    $scope.deleteClass = function(classId) {
      Class.deleteClass(classId).then(function(data) {
        console.log('Should have deleted class', data);
        $scope.getClasses();
      });
    };


    $scope.assignProject = function(projectId, classId) {
      Project.assignProject(projectId, classId).then(function(response) {
        var project = response[2];
        var includes = false;
        $scope.teacherClasses.forEach(function(_class){
          if(classId === _class.id){
            _class.Projects.forEach(function(project){
              if(project.id === projectId) includes = true;
            });
            
            !includes && _class.Projects.push(project);
          } 
        });
      });
    };

    $scope.unassignProject = function(projectId, classId) {
      Project.unassignProject(projectId, classId).then(function(response){
        console.log(response);
        console.log('unassign complete: response received');
        $scope.teacherClasses.forEach(function(_class){
          if(classId = _class.id){
            var delIndex;
            _class.Projects.forEach(function(project, index){
              if(project.id === projectId) delIndex = index;
            });
            delIndex !== undefined && _class.Projects.splice(delIndex, 1);
          }
        });
      });
    };

    $scope.getProjects();
    $scope.getClasses();

  });
