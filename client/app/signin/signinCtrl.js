angular.module('app')
  .controller('signinCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.hideWrongPassword = true;

    $scope.signin = function(username, password) {
      User.signin(username, password)
      .catch(function(err){
        $scope.hideWrongPassword = false;
      });
    };
  });