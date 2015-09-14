angular.module('app')
  .controller('teacherHomeCtrl', function teacherHomeCtrl($scope, $state, $modal, Class, Project) {

    // PROJECTS
    $scope.getProjects = function() {
      Project.getProjects().then(function(projects) {
        $scope.teacherProjects = projects;
      });
    };

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


    $scope.assignProject = function(projectId) {
      console.log(projectId);
      var classId = window.prompt('What is the classId you want to add?');
      Project.assignProject(projectId, classId).then(function(response) {
        console.log('project assigned', response);
      });
    };

    $scope.getProjects();
    $scope.getClasses();

  });
