describe('loginCtrl', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function (_$controller_){
    $controller = _$controller_;
  }));

  describe('loginCtrl', function(){
    it('is defined', function(){
      $scope = {};
      var controller = $controller('loginCtrl', { $scope : $scope});
      expect(controller).toBeDefined();
    })
  });
});