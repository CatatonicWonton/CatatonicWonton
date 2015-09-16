angular.module('app')
  .controller('signupCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.hideAlreadyRegistered = true;
    $scope.hidePasswordMatch = true;

    $scope.signup = function(firstName, lastName, username, password, confirmedPassword, accountType) {
      if(password !== confirmedPassword) {
        $scope.hidePasswordMatch = false;
      } else {
        $scope.hidePasswordMatch = true;
        User.signup(firstName, lastName, username, password, accountType).then(function(res){
          if(res === 'Username is already taken!') {
            $scope.hideAlreadyRegistered = false;
          }
          if(res === true) {
            User.signin(username, password);
          }
        });
      }
      
    };


  });