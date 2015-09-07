angular.module('app')
  .factory('Class', function Class($http, $stateParams) {

    var getClasses = function() {
      return $http.get('/api/class').then(function(response){
        return response.data;
      });
    };

    var getClass = function() {
      return $http.get('/api/class/' + $stateParams.classId).then(function(response) {
        return response.data;
      });
    };

    return {
      getClasses: getClasses,
      getClass: getClass
    };

  });
     



