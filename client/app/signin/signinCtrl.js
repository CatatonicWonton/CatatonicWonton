angular.module('app')
  .controller('signinCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.hideWrongPassword = true;

    $scope.signin = function(username, password) {
      User.signin(username, password).then(function(res){

        User.setUser(res.data);
        $scope.$emit('teacherOrStudent');
        if(res.data.accountType === 'Teacher') {
          $state.go('teacherHome');
        }else {
          $state.go('studentHome');
        }
      })
      .catch(function(err){
        $scope.hideWrongPassword = false;
      });
    };
  });