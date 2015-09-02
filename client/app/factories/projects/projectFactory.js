angular.module('app')
   .factory('projectFactory', function projectFactory(userFactory, $sce) {
     
     // eventually we will use api to populate projects array
     // stores all teacher or student projects
     var Projects = [];

     // models for Project, Page and ContentComponent
     var Project = function(title, subject, author, id) {
       this.projectId = id || makeid();
       this.title = title;
       this.subject = subject;
       this.author = author;
       this.pages = [];

       // add one page for default
       this.pages.push(new Page('Page1'))
     };

     var Page = function(title, id) {
       this.pageId = id || makeid();
       this.title = title;
       this.contentComponents = [];

       this.contentComponents.push(new ContentComponent())
     };

     var ContentComponent = function(html, id) {
       this.contentId = id || makeid();
       this.html = html || '<p>this is sample text</p>';
     };




     // creates projects for testing, feel free to ignore
     Projects.push(new Project('BugProject', 'Science', 'Mr.K'));
     Projects.push(new Project('Poetry', 'English', 'Mr.Z'));
     Projects[0].pages.push(new Page('NextPage'));


     // methods
     var addProject = function(title, subject, author, id) {
      // add to factories Project collection
      Projects.push(new Project(title, subject, author, id));

      // set the currentProjectId
      userFactory.currentProjectId = Projects.length-1;

      // send post request to api to update database
     };

     var addPage = function(title) {
      Projects[userFactory.currentProjectId].pages.push(new Page(title));
      // send post request to update database
     };

     var updatePage = function() {

     };

     var deletePage = function() {

     };

     var addContentComponent = function(html, index) {
      Projects[userFactory.currentProjectId].pages[index].contentComponents.push(new ContentComponent($sce.trustAsHtml(html)));
      // send post request to update database
     };

     var updateContentComponent = function() {

     };

     // return Projects array and eventually other helper functions
     // like add or edit projects
     return {
       projects: Projects,
       addProject: addProject,
       addPage: addPage,
       updatePage: updatePage,
       deletePage: deletePage,
       addContentComponent: addContentComponent,
       updateContentComponent: updateContentComponent
     }
   })

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
        content: {
          contentId: '1',
          actualContent: '<p>Bugs are strange creatures. What are your favorite bugs?</p>'
        }
      },
      {
        pageId: '2',
        title: '',
        content: {
          contentId: '',
          actualContent: ''
        }
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
        content: {
          contentId: '',
          actualContent: ''
        }
      },
      {
        pageId: '2',
        title: '',
        content: {
          contentId: '',
          actualContent: ''
        }
      }
    ]
  }
]
*/