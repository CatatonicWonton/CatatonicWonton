angular.module('app')
  .controller('signupCtrl', function($scope, $state, User){
    // create function to handle the request to our api to signin and signup
    $scope.signup = function(firstName, lastName, username, password, accountType) {
      User.signup(firstName, lastName, username, password, accountType).then(function(res){
        // todo: we will eventually check for true, not "success"
        console.log(username, password);
        if(res.data === true) {
          User.signin(username, password).then(function(response){
            // console.log(response);
            // response.data.accountType === 'Teacher' ? $state.go('teacherHome') : $state.go('studentHome');
            if (response.data.accountType === 'Teacher') {
              $state.go('teacherHome');
            } else {
              $state.go('studentHome');
            }
          });
        }
      });
    };
  });