angular.module('app')
  .controller('videoCtrl', function($scope, $rootScope) {
    $scope.showVideo = true;

    $rootScope.$on('toggleVideo', function() {
      $scope.showVideo = !$scope.showVideo;
    });
  })