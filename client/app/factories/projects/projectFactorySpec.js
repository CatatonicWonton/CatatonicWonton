// write tests based on permission
describe('projectFactory', function(){
  beforeEach(module('app'));

  var projectFactory;

  beforeEach(inject(function (_projectFactory_){
    projectFactory = _projectFactory_;
  }));

  describe('projectFactory', function(){
    it('is defined', function(){
      expect(projectFactory).toBeDefined();
    });
    it('contains an array of projects', function(){
      expect(projectFactory.projects.length).toBeGreaterThan(-1);
    });
  })
});