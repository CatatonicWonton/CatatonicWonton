angular.module('app')
  .factory('Class', function Class($http, $stateParams, User) {

    var getClasses = function() {
      return $http.get('/api/class').then(function(response){
        return response.data;
      });
    };

    var getClass = function() {
      return $http.get('/api/class/' + $stateParams.classId).then(function(response) {
        console.log('Current class:', response.data);
        return response.data;
      });
    };

    var createClass = function(className) {
      return $http.post('/api/class/', {name: className}).then(function(response) {
        return response.data.id;
      });
    };

    var deleteClass = function(classId) {
      return $http.delete('/api/class/' + classId).then(function(response) {
        return response.data;
      });
    };

    var joinClass = function(classId) {
      var studentId = User.getUser()._id;
      return $http.post('api/studentClass/' + classId, {
        StudentId: studentId
      }).then(function(response){
        return response.data;
      });
    }

    return {
      getClasses: getClasses,
      getClass: getClass,
      createClass: createClass,
      deleteClass: deleteClass,
      joinClass: joinClass
    };

  });
     



