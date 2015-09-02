describe('teacherProjectCtrl', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function (_$controller_){
    $controller = _$controller_;
    $scope = {};
    controller = $controller('teacherHomeCtrl', { $scope : $scope});
  }));

  describe('teacherProjectCtrl', function(){
    if('should do something', function() {
    })
  });
});