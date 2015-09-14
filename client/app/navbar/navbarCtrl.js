angular.module('app')
  .controller('navbarCtrl', function($scope, $state, $http, $rootScope, User) {

    $scope.logout = function() {
      $http.post('/auth/logout', {}).then(function(response) {
        $state.go('signin');
      });
    };

    $scope.navBarCollapsed = true;    

    // makes sure the nav bar only shows the appropriate links for the user
    var setNavbar = function() {
      var accountType = User.getUser().accountType;
      $scope.isTeacher = accountType === 'Teacher' ? true : false;
    };

    $rootScope.$on('teacherOrStudent', setNavbar);
});
