angular.module('app')
  .controller('navbarCtrl', function($scope, $state, $http, $rootScope, User) {
    
    $scope.navBarCollapsed = true;    
    $scope.loggedIn = false;

    $scope.logout = function() {
      User.logout($scope);
    };

    // makes sure the nav bar only shows the appropriate links for the user
    var setNavbar = function() {
      var accountType = User.getUser().accountType;
      $scope.loggedIn = true;
      $scope.isTeacher = accountType === 'Teacher' ? true : false;
    };

    $rootScope.$on('teacherOrStudent', setNavbar);
});
