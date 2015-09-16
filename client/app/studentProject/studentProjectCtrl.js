angular.module('app')
  .controller('studentProjectCtrl', function studentProjectCtrl($scope, $sce, Project, Class, User, HelpRequest){

    $scope.project;
    $scope.currentPage;
    $scope.currentIndex;

    // PROJECT
    $scope.getProject = function() {
      Project.getProject().then(function(project){
        $scope.project = project;
        $scope.changePage(0);        
      });
    };

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

    $scope.makeActive = function(index) {
      if($scope.currentIndex === index) {
        console.log('success', index, $scope.currentIndex);
        return 'page-active';
      }
    };

    $scope.trustify = function(content) {
      return $sce.trustAsHtml(content);
    };

    $scope.getProject();

    // HELP REQUEST SOCKET
    $scope.sendHelpRequest = function() {
      HelpRequest.submitHelpRequest(/* pass the info you want for the request */);
    };

  });