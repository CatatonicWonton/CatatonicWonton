angular.module('app')
  .controller('studentProjectCtrl', function studentProjectCtrl($scope, $sce, $modal, Project, Class, User, HelpRequest, Notification){

    // MODEL
    $scope.project;
    $scope.currentPage;
    $scope.currentIndex;
    
    var teacherId;
    var projectName;

    // Gets specific project
    $scope.getProject = function() {
      Project.getProject().then(function(project){
        
        $scope.project = project;
        $scope.changePage(0);

        projectName = project.name;
        teacherId = project.TeacherId;     
        // projectName = project.projectName;     
      });
    };

    // get projects each time page loads
    $scope.getProject();

    $scope.changePage = function(pageIndex, change) {
      if(pageIndex >= $scope.project.Pages.length) {
        pageIndex = 0;
      } else if(pageIndex < 0) {
        pageIndex = 0;
      }
      $scope.currentPage = $scope.project.Pages[pageIndex];
      $scope.currentIndex = pageIndex;
      // emit event to update the users current status
      Class.updateStudentStatus($scope.project.name, $scope.currentPage.title);
    };


    // Highlights current page
    $scope.makeActive = function(index) {
      if($scope.currentIndex === index) {
        return 'page-active';
      }
    };

    // Allows video/image files to display
    $scope.trustify = function(content) {
      return $sce.trustAsHtml(content);
    };

    // Sends help request
    $scope.sendHelpRequest = function(question) {
      var userId = User.getUserId();
      HelpRequest.submitHelpRequest(teacherId, userId, question, projectName);
    };

    $scope.modalOpen = function(questionArr, callback) {
      var modalInstance = $modal.open({
        templateUrl: 'app/studentProject/newQuestionModal.html',
        controller: function($scope, $modalInstance) {
          $scope.questionArr = questionArr;
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

    HelpRequest.establishAcknowledgedSocket($scope, function (data) {
      HelpRequest.getMostRecentlyUpdated().then(function (helpRequest) {
        var thisUser = User.getUserId();
        if(thisUser === helpRequest.StudentId) {
          Notification.success(
            'Your teacher has seen your question and will be with you shortly.'
          );  
        }        
      })
    });
  });