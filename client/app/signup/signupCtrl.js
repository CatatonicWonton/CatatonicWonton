angular.module('app')
  .controller('signupCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.signup = function(username, password, type) {
    
      User.signup(username, password, type).then(function(){
        // route them to login
        $state.go('signin');
      });
    };
  });

  // EXTRA: automatically sign them in