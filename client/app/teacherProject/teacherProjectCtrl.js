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
      console.log('html', htmlString);
      console.log('pageId', pageId);

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

