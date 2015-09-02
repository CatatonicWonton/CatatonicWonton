angular.module('app')
  .controller('teacherProjectCtrl', function teacherProjectCtrl($scope, projectFactory, userFactory){

    // model: this is where we store the relevant data for this view
    $scope.currentProject = projectFactory.projects[userFactory.currentProjectId];
    $scope.currentIndex = 0;
    $scope.currentPage = $scope.currentProject.pages[0];
    $scope.newComponentHtml = '';
    $scope.isTextEditorVisible = false;
    $scope.froalaOptions = {
        placeholder: 'hey there',
        inlineMode: false
    }

    $scope.toggleTextEditor = function() {
      if($scope.isTextEditorVisible) {
        $scope.isTextEditorVisible = false;
      }else {
        $scope.isTextEditorVisible = true;
      }
    }

    $scope.addPage = function(title) {
      var title = window.prompt('What is the title of this page?')
      projectFactory.addPage(title);
      $scope.newPageTitle = '';
    };

    $scope.addContentComponent = function(html, index) {
      projectFactory.addContentComponent(html, $scope.currentIndex);
      $scope.newComponentHtml = '';
      $scope.toggleTextEditor();
    };

    $scope.setCurrentPage = function(index) {
      $scope.currentIndex = index;
      $scope.currentPage = $scope.currentProject.pages[index];
    };
  });