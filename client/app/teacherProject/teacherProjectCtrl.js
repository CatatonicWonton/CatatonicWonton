angular.module('app')
  .controller('teacherProjectCtrl', function teacherProjectCtrl($scope, $sce, $timeout, Project, User){

    $scope.project;
    $scope.currentPage;
    $scope.currentIndex;
    $scope.froalaOptions = {
        placeholder: 'Add text, images, videos, and links here',
        inlineMode: false,
        toolbarFixed: true
    };

    var timeout = null;

    var debounceSaveUpdates = function(newContent, oldContent) {
      if(newContent !== undefined && oldContent !== undefined) {
        console.log('New:', newContent);
        console.log('Old:', oldContent);
        if(timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(function() {
          $scope.createContent(newContent, $scope.currentPage.id);
        }, 3000);
      }
    };

    $scope.$watch('currentPage.content', debounceSaveUpdates);

    // PROJECT
    $scope.getProject = function() {
      Project.getProject().then(function(project){
        $scope.project = project;
        $scope.changePage(0);
        // if($scope.project.Pages.length > 0) $scope.project.Pages[0].active = true;
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
        // go to new page
        $scope.changePage($scope.project.Pages.length-1);
      });
    };

    $scope.changePage = function(pageIndex) {
      if(pageIndex >= $scope.project.Pages.length) {
        pageIndex = 0;
      } else if(pageIndex < 0) {
        pageIndex = 0;
      }
      $scope.currentPage = $scope.project.Pages[pageIndex];
      $scope.currentIndex = pageIndex;
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

  });

