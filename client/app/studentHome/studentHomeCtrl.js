angular.module('app')
  .controller('studentHomeCtrl', function studentHomeCtrl($scope, $state, Class, Project, User){
    
    // PROJECTS
    $scope.alerts = [];
    $scope.student = User.getUser();
    // Drop down toggled status, init as closed
    $scope.addClassToggle = false;



    $scope.addAlert = function(messageText){
      $scope.alerts.push( { msg: messageText} );
    };

    $scope.closeAlert = function(index){
      $scope.alerts.splice(index, 1);
    };

    $scope.getProjects = function() {
      return Project.getProjects().then(function(projects){
        console.log(projects);
        $scope.studentProjects = projects;
      });
    };

    $scope.getProjects();
    
    $scope.getClasses = function() {
      Class.getClasses().then(function(classes){
        console.log("Got all classes");
        console.log(classes);
        $scope.studentClasses = classes;
      });
    };

    $scope.getClasses();

    $scope.getAllClasses = function() {
      Class.getAllClasses().then(function(classes){
        $scope.allClasses = classes;
      });
    };

    $scope.getAllClasses();
  
    // pass in projectId from the view
    $scope.goToProject = function(projectId) {
      $state.go('studentProject', {projectId: projectId});
    };

    $scope.joinClass = function(classId) {
      var classid = classId;
      Class.joinClass(classId)
        .then(function(data) {
          $scope.getProjects()
            .then(function(){
              var classList = $scope.studentClasses;
              var include = classList.reduce(function (include, _class){
                if(include) return true;
                if(_class.id === classid) return false;
              }, false);

              if(!include) classList.push(data);

            })
            .catch(function(error){
              throw error;
            });
        })
        .catch(function(error){
          $scope.addAlert('Already enrolled');
        });
    };

  });

