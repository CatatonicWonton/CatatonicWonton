angular.module('app')
  .factory('Project', function Project($http, $routeParams) {
    
    // TEACHER HOME CONTROLLER:

    var getProjects = function() {
      return $http.get('api/projects').then(function(data){
        // convert data into useable array
      });
    };

    var createProject = function() {
      return $http.post('api/projects').then(function(data){
        // return the newly created projectId e.g. data.projectId
      });
    };

    // TEACHER PROJECT CONTROLLER:

    var getProject = function() {
      return $http.get('api/project/' + $routeParams.projectId);
    };

  })
     










// ************************************************************************ //











// this is used for testing, but we should be getting back these ids when we requrest data from api
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// this should more or less represent our current data structure
/* 
var Projects = [
  {
    projectId: '1',
    title: 'BugProject',
    subject: 'Science',
    author: 'Adnan',
    pages: [
      {
        pageId: '1',
        title: 'BugLife',
        content: [
          {
            contentId: '1',
            actualContent: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
          },
          {
            contentId: '2',
            actualContent: '<div>something else here'
          }
        ]
      },
      {
        pageId: '2',
        title: '',
        content: [
          {
            contentId: '1',
            actualContent: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
          },
          {
            contentId: '2',
            actualContent: '<div>something else here'
          }
        ]
      }
    ]
  },
  {
    projectId: '2',
    title: '',
    subject: '',
    author: 'Jeffrey'
    pages: [
      {
        pageId: '1',
        title: '',
        content: [
          {
            contentId: '1',
            actualContent: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
          },
          {
            contentId: '2',
            actualContent: '<div>something else here'
          }
        ]
      },
      {
        pageId: '2',
        title: '',
        content: [
          {
            contentId: '1',
            actualContent: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
          },
          {
            contentId: '2',
            actualContent: '<div>something else here'
          }
        ]
      }
    ]
  }
]
*/