angular.module('app')
  .controller('studentProjectCtrl', function studentProjectCtrl($scope, $sce, Project, Class, User, HelpRequest){

    // MODEL
    $scope.project;
    $scope.currentPage;
    $scope.currentIndex;
    var teacherId;


    // Gets specific project
    $scope.getProject = function() {
      Project.getProject().then(function(project){
        $scope.project = project;
        $scope.changePage(0);
        teacherId = project.TeacherId;     
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
      var userId = User.getUser()._id;
      HelpRequest.submitHelpRequest(teacherId, userId, question);
    };
  });