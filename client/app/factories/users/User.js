angular.module('app')
  .factory('User', function User ($http) {

    // todo:
    var signup = function(firstName, lastName, username, password, accountType) {
      return $http.post('/auth/signup', {
        firstName   : firstName,
        lastName    : lastName,
        username    : username,
        password    : password,
        accountType : accountType
      });
    };

    var signin = function(username, password) {
      return $http.post('/auth/login', {
        username: username,
        password: password
      });
    };

    return {
      signup: signup,      
      signin: signin
    }
  })
  