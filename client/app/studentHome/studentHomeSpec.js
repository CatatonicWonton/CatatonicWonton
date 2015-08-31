describe('studentHomeCtrl', function(){
  beforeEach(module('app'));

  var studentHomeCtrl,
      projectFactory;

  beforeEach(inject(function (_projectFactory_, _$controller_){    
    projectFactory = _projectFactory_;
    $controller = _$controller_
    $scope = {};
    $controller('studentHomeCtrl', {$scope: $scope});

  }));


  describe('displays projects correctly', function() {
    it('gets an array of projects from the projects factory', function() {
      expect($scope.projects.length).toBeGreaterThan(-1);
    });
  });
});