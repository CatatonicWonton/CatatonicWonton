// DIRECTIVE: NAVBAR

angular.module('app')
.directive('navbar', function(){
  return {
    restrict: "E",
    templateUrl: "/app/navbar/nav-bar.html"
  };
});