angular.module('app')
  .factory('User', function User ($http) {

    var user = {};

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

    var setUser = function(userData) {
      user._id = userData._id;
      user.accountType = userData.accountType;
      user.username = userData.username;
    };

    var getUser = function() {
      return user;
    };

    return {
      signup: signup,      
      signin: signin,
      setUser: setUser,
      getUser: getUser
    };
  });
  