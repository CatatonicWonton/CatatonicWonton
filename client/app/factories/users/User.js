// todo: rename to 'Auth'

angular.module('app')
  .factory('User', function User ($http) {
    var signupTeacher = function(username, password) {
      return $http.post('api/signupTeacher', {username: username, password: password});
    };

    var signupStudent = function(username, password) {
      return $http.post('api/signupStudent', {username: username, password: password});
    };


    // todo:
    var signin = function(username, password) {
      return $http.post('api/signin', {username: username, password: password});
    };

    return {
      signupTeacher: signupTeacher,      
      signupStudent: signupStudent,      
      signin: signin
    }
  })
  