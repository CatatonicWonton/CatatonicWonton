describe('landingCtrl', function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function (_$controller_){
    $controller = _$controller_;
    $scope = {};
    controller = $controller('teacherHomeCtrl', { $scope : $scope});
  }));

  describe('teacherHomeCtrl', function(){
    it('should have an array of teacher\'s projects', function(){
      expect($scope.teacherProjects).toBeDefined();
    })
    it('should show each projects name and number of tasks', function(){
      
    })
    it('should have a function that adds a new project', function(){
      expect($scope.addProject).toBeDefined();
    })
    it('should be able to add new project', function(){
      // when we click to add a new project
      // there should be a model that pops up to take the initial info
    })
    it('should have a function that assigns projects to class', function(){
    
    })
    it('should let you edit an old project', function(){
    
    })
  });
});