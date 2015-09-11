// CONTROLLER: TEACHER PROJECT

angular.module('app')
  .controller('teacherProjectCtrl', function teacherProjectCtrl($scope, $sce, Project, User){

    $scope.project = null;
    $scope.currentPage = null;

    $scope.froalaOptions = {
        placeholder: 'Add text, images, videos, and links here',
        inlineMode: false
    };

    // PROJECT
    $scope.getProject = function() {
      Project.getProject().then(function(project){
        $scope.project = project;
        if($scope.project.Pages.length > 0) $scope.project.Pages[0].active = true;
      });
    };

    // PAGE
    $scope.createPage = function() {
      var pageTitle = window.prompt('What is the title of the page?');
      Project.createPage(pageTitle).then(function(page){
        page.active = true;
        console.log(page);
        console.log('Should have switched');
        $scope.project.Pages.push(page);
      });
    };

    $scope.updatePage = function(pageTitle) { /* todo */ };

    $scope.createContent = function(htmlString, pageId) { 
      Project.createContent(htmlString, pageId).then(function(page){
        angular.forEach($scope.project.Pages, function(currentPage) {
          if(currentPage.id === pageId) {
            currentPage.content = page.content;
          }
        });
      }); 
    };

    $scope.trustify = function(content) {
      return $sce.trustAsHtml(content);
    };

    $scope.getProject();

  });



// ******************************************************************************** //
        // trash:
// ******************************************************************************** //

/*

    // model: this is where we store the relevant data for this view
    $scope.currentProject = projectFactory.projects[userFactory.currentProjectId];
    $scope.currentIndex = 0;
    $scope.currentPage = $scope.currentProject.pages[0];
    $scope.newComponentHtml = '';
    $scope.isTextEditorVisible = false;
    $scope.froalaOptions = {
        placeholder: 'Add text, images, videos, and links here',
        inlineMode: false
    }

    $scope.toggleTextEditor = function() {
      if($scope.isTextEditorVisible) {
        $scope.isTextEditorVisible = false;
      }else {
        $scope.isTextEditorVisible = true;
      }
    }

    $scope.addPage = function() {
      var title = window.prompt('What is the title of this page?')
      projectFactory.addPage(title);
    };

    $scope.updatePage = function(index) {
      var title = window.prompt('What should the title of the page be?')
      projectFactory.updatePage(title, $scope.currentIndex);
    }

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

*/