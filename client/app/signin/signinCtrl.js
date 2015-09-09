angular.module('app')
  .controller('signinCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.signin = function(username, password) {
      User.signin(username, password).then(function(){
        // type === 'teacher' ? $state.go('teacherHome') : $state.go('studentHome');
      });
    };
  });