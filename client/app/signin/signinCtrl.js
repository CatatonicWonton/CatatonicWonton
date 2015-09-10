angular.module('app')
  .controller('signinCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.signin = function(username, password) {
      console.log('im working');
      User.signin(username, password).then(function(res){
        res.data.accountType === 'Teacher' ? $state.go('teacherHome') : $state.go('studentHome');
        // type === 'teacher' ? $state.go('teacherHome') : $state.go('studentHome');
      });
    };
  });