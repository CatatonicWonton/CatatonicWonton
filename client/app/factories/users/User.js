// todo: rename to 'Auth'

angular.module('app')
  .factory('User', function User ($http) {

    // todo:
    var signup = function(username, password, type) {
      return {
        username: username,
        password: password,
        type: type
      };


      // return $http.post('api/signup', {username: username, password: password, type: type});
    };

    // todo:
    var signin = function(username, password) {
      return $http.post('api/signin', {username: username, password: password});
    };

    return {
      signup: signup,      
      signin: signin
    }
  })
  