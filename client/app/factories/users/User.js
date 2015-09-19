angular.module('app')
  .factory('User', function User ($http, $state, $rootScope) {

    var user = {};

    // todo:
    var signup = function(firstName, lastName, username, password, accountType) {
      return $http.post('/auth/signup', {
        firstName   : firstName,
        lastName    : lastName,
        username    : username,
        password    : password,
        accountType : accountType
      })
      .then(function(res) {
        return res.data;
      });
    };

    var signin = function(username, password) {
      return $http.post('/auth/login', {
        username: username,
        password: password
      })
      .then(function(res) {
        setUser(res.data);
        $rootScope.$emit('teacherOrStudent');
        $rootScope.$emit('toggleVideo');
        if (res.data.accountType === 'Teacher') {
          $state.go('teacherHome');
        } else {
          $state.go('studentHome');
        }
      });
    };

    var logout = function(scope) {
      $http.post('/auth/logout', {}).then(function() {
        setUser({
          _id: '',
          accountType: '',
          username: ''
        });
        $rootScope.$emit('toggleVideo');
        scope.loggedIn = false;
        $state.go('landing');
      });
    }

    var setUser = function(userData) {
      user._id = userData._id;
      user.accountType = userData.accountType;
      user.username = userData.username;
    };

    var getUser = function() {
      return $http.get('/auth/login');
    };

    var getUserObj = function() {
      return user;
    };

    var getUserId = function() {
      return user._id;
    };

    var getStudent = function(StudentId) {
      var url = '/api/student/' + StudentId;
      return $http.get(url).then(function (response) {
        return response.data;
      });
    };

    return {
      signup: signup,      
      signin: signin,
      logout: logout,
      setUser: setUser,
      getUser: getUser,
      getUserId: getUserId,
      getUserObj: getUserObj,
      getStudent: getStudent
    };
  });
  