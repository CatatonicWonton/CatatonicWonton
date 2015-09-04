angular.module('app')
  .controller('signinCtrl', function($scope, User){
    // create function to handle the request to our api to signin and signup
    $scope.signin = function(username, password) {
      User.signin(username, password).then(function(type){
        type === 'teacher' ? $state.go('teacherHome') : $state.go('studentHome');
      });
    };
  });