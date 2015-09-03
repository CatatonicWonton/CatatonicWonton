// todo: rename to 'Auth'

angular.module('app')
  .factory('User', function User ($http) {

    // todo: combine signups with radial/radius buttons
    var signup = function(username, password, type) {
      return $http.post('api/signup', {username: username, password: password, type: type});
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
  