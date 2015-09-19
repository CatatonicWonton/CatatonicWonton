angular.module('app')
  .controller('navbarCtrl', function ($scope, $state, $http, $rootScope, User, HelpRequest) {
    
    $scope.navBarCollapsed = true;    
    $scope.loggedIn = false;
    $scope.helpRequestTotal;


    $scope.logout = function() {
      User.logout($scope);
    };

    // makes sure the nav bar only shows the appropriate links for the user
    $scope.setNavbar = function() {
      User.getUser().then(function(object){
        var accountType = object.data.accountType;
        console.log('navbarCtrl.js: accountType: ',accountType);
        $scope.loggedIn = accountType === undefined ? false : true;
        $scope.isTeacher = accountType === 'Teacher' ? true : false;
        console.log('navbarCtrl.js: isTeacher: ', $scope.isTeacher);
      });
    };

    $scope.setNavbar();
    $rootScope.$on('$stateChangeStart', $scope.setNavbar);
    $rootScope.$on('teacherOrStudent', $scope.setNavbar);


});
