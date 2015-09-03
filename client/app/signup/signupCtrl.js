angular.module('app')
  .controller('signupCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.signup = function(username, password) {
      User.signup(username, password).then(function(){
        // route them to login
        $state.go('signin');
      });
    };
  });