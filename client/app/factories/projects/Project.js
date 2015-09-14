angular.module('app')
  .factory('Project', function Project($http, $stateParams) {

    // for STUDENT + TEACHER HOME CONTROLLER:
    var getProjects = function() {  // jwt or session takes care of teacher's subset of projects
      return $http.get('/api/projects').then(function(response){
        return response.data;
      });
    };

    /* [+] button */
    var createProject = function(name, subject, author) {
      var projectData = {name: name, subject: subject, author: author};
      return $http.post('/api/projects', projectData).then(function(response){
        console.log(response);
        return response.data.id;
      });
    };

    // for STUDENT + TEACHER PROJECT CONTROLLER:
    var getProject = function() {
      var url = '/api/projects/' + $stateParams.projectId;
      return $http.get(url).then(function(response) {
        console.log(response);
        return response.data;
      }); // returns project obj
    };

    // PAGE METHODS
    var createPage = function(title) { // todo: fix route
      var url = '/api/page/' + $stateParams.projectId;
      return $http.post(url, {title: title})
        .then(function(response){
          return response.data; // returns newly created page info object
        });
    };

    var updatePage = function(pageTitle) { /* todo */ };
    
    // CONTENT METHODS
    // this creates and/or updates using PUT
    var createContent = function(htmlString, pageId) {
      var url = '/api/page/' + pageId;
      return $http.put(url, {content: htmlString}).then(function(result){
          return result.data;
      });
    };

    var assignProject = function(projectId, classId) {
      var url = '/api/studentProject/class/' + classId;
      return $http.post(url, {
        ProjectId: projectId
      }).then(function(response) {
        return response.data;
      });
    };

    var unassignProject = function(projectId, classId) {
      var url = '/api/studentProject/class/'+classId+'/'+projectId+'/delete';
      return $http.get(url)
        .then(function(response){
          return response.data;
        });
      };

    return {
      getProjects: getProjects,
      createProject: createProject,
      getProject: getProject,
      createPage: createPage, 
      // updatePage: updatePage, 
      createContent: createContent,
      assignProject: assignProject,
      unassignProject: unassignProject
    };
  });











// ************************************************************************ //


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