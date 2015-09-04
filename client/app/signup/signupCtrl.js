angular.module('app')
  .controller('signupCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup



    $scope.signup = function(username, password, type) {

      console.log(username, 'username')
      console.log(password, 'password')
      console.log(type, 'type')

      User.signup(username, password, type).then(function(){
          
        // check for auth to make sure usename isn't taken

        // route them to login
        $state.go('signin');
      });
    };
  });

  // EXTRA: automatically sign them in