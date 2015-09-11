angular.module('app')
  .controller('navbarCtrl', function($scope, $state, $http, $rootScope, User) {

    $scope.logout = function() {
      $http.post('/auth/logout', {}).then(function(response) {
        $state.go('signin');
      });
    };

    $scope.navBarCollapsed = true;    

    var setNavbar = function() {
      console.log(User.getUser(), 'got user');
      var accountType = User.getUser().accountType;
      $scope.isTeacher = accountType === 'Teacher' ? true : false;
    };

    $rootScope.$on('teacherOrStudent', setNavbar);
});
