angular.module('app')
  .factory('userFactory', function() {
    // need to define exactly what user info we will need
    return {
      username: 'Jeffrey Oscar Plourd',
      currentProjectId: 0
    }
  })