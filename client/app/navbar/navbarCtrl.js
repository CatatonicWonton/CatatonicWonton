// CONTROLLER: NAVBAR

angular.module('app')
  .controller('navbarCtrl', function($scope, $state, $http) {
    $scope.logout = function() {
      $http.post('/auth/logout', {}).then(function(response) {
        // probably want to do something after logout
        $state.go('signin');
      });
    };

  $scope.navBarCollapsed = true;    

});

