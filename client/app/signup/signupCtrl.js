angular.module('app')
  .controller('signupCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.signup = function(firstName, lastName, username, password, accountType) {
      User.signup(firstName, lastName, username, password, accountType).then(function(){
        User.signin(username, password).then(function(){
          accountType === 'Teacher' ? $state.go('teacherHome') : $state.go('studentHome');
        });
      });
    };
  });