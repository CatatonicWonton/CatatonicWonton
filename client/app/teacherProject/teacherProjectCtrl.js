angular.module('app')
  .controller('teacherProjectCtrl', function teacherProjectCtrl($scope, Project, User){

    // todo: organize methods by category

    // PROJECT
    $scope.getProject = function() {
      Project.getProject().then(function(project){
        $scope.project = project;
        console.log("Project:", project);
      });
    };

    // PAGE
    $scope.createPage = function() {
      var pageTitle = window.prompt('What is the title of the page?');
      Project.createPage(pageTitle).then(function(page){
        console.log(page);
        // $scope.project.pages.push(page);
        $scope.getProject();
      });
    };

    $scope.updatePage = function(pageTitle) { /* todo */ };

    // CONTENT
    $scope.createContent = function(htmlString, pageIndex) { 
      var pageId = $scope.project.pages[pageIndex].pageId;

      Project.createContent(htmlString, pageId).then(function(newContent){
        $scope.project.pages[pageId].content.push(newContent);
      }); 
    };

    $scope.updateContent = function() { /* todo */ };

    $scope.getProject();

  })



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