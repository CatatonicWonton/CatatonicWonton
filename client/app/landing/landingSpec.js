describe('landingCtrl', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function (_$controller_){
    $controller = _$controller_;
  }));

  describe('$scope.test', function(){
    it('is defined', function(){
      $scope = {};
      var controller = $controller('landingCtrl', { $scope : $scope});
      expect($scope.test).toEqual('test');
    })
  })
});