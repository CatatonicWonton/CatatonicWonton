angular.module('app')
  .factory('Class', function Class($http) {

    var getClasses = function() {
      return $http.get('api/classes').then(function(data){
        // convert data into useable array
      });
    };


    return {
      getClasses: getClasses 
    }

  })
     



