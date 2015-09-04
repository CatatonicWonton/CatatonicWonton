angular.module('app')
  .factory('Project', function Project($http, $routeParams) {
    
    // for STUDENT + TEACHER HOME CONTROLLER:
    var getProjects = function() {  // jwt or session takes care of teacher's subset of projects
      return $http.get('api/projects').then(function(response){
        // convert data into useable array
        console.log(response);
        return response;
      });
    };

    /* [+] button */
    var createProject = function(title, subject, author) {
      return $http.post('api/projects', {title: title, subject: subject, author: author}).then(function(response){
        console.log(response);
      });
    };

    // for STUDENT + TEACHER PROJECT CONTROLLER:
    var getProject = function() {
      return $http.get('api/projects/' + $routeParams.projectId); // returns project obj
    };

    // PAGE METHODS
    var createPage = function(pageTitle) { // todo: fix route
      return $http.post('api/projects/' + $routeParams.projectId, {pageTitle: pageTitle})
        .then(function(page){
          return page.asdf // returns newly created page info object

        });
    };

    var updatePage = function(pageTitle) { /* todo */ };
    
    // CONTENT METHODS
    var createContent = function(htmlString, pageId) {
      return $http.post('api/projects/' + $routeParams.projectId + '/' + pageId, {htmlString: htmlString})
        .then(function(content){
          return content.asdf // return newly created content object
        });
    }

    var updateContent = function(htmlString, pageId) { /* todo */ };

    return {
      getProjects: getProjects,
      createProject: createProject,
      getProject: getProject,
      createPage: createPage, 
      // updatePage: updatePage, 
      createContent: createContent
      // updateContent: updateContent
    }


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
        plugin: [
          {
            pluginId: '1',
            actualplugin: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
          },
          {
            pluginId: '2',
            actualplugin: '<div>something else here'
          }
        ]
      },
      {
        pageId: '2',
        title: '',
        plugin: [
          {
            pluginId: '1',
            actualplugin: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
          },
          {
            pluginId: '2',
            actualplugin: '<div>something else here'
          }
        ]
      }
    ]
  }
]
*/