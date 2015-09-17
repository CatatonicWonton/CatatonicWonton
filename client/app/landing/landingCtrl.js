angular.module('app')
  .controller('landingCtrl', function ($scope){
    $scope.test = 'test';
    $scope.options = {
    chart: {
      type: 'pieChart',
      height: 450,
      donut: true,
      x: function(d){return d.key;},
      y: function(d){return d.y;},
      showLabels: true,
      pie: {
        startAngle: function(d) { return d.startAngle -Math.PI },
        endAngle: function(d) { return d.endAngle -Math.PI }
      },
      transitionDuration: 500,
      style: {
        'color': 'red',
        'background-color': 'blue'
      },
      legend: {
        margin: {
          top: 5,
          right: 140,
          bottom: 5,
          left: 0
        }
      }
    }
    };

     $scope.data = [
         {
             key: "Bacon",
             y: 5
         },
         {
             key: "Avacodo",
             y: 2
         },
         {
             key: "Carne Asada",
             y: 4
         },
         {
             key: "Tofu",
             y: 3
         },
         {
             key: "School.io",
             y: 15
         }
     ];
  });