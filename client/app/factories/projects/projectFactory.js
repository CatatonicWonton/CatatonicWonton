angular.module('app')
  .factory('projectFactory', function projectFactory(){
    // student projects
    return {
      projects: [
        {
          name: 'Bug project',
          subject: 'Science',
          author: 'Adnan',
          pages: [
            {
              title: 'Intro',
              content: 'This is the best project.',
              answer: 'Agreed'
            },
            {
              title: 'Rubric',
              content: 'What grade do you want?',
              answer: 100
            }
          ]
        },
        {
          name: 'Poetry project',
          subject: 'English',
          author: 'Adnan',
          pages: [
            {
              title: 'Intro',
              content: 'Write some haikus, amirite?',
              answer: 'Yes'
            },
            {
              title: 'Haiku stuff',
              content: 'Some haikus are good\nbut some can be confusing.\nRefrigerator.',
              answer: 'Yes'
            }
          ]
        }
      ]
    }
  });


/* 
  GET /projects 
  
  {
    projects: [
      {
        name: String,
        subject: String,
        author: String,
        pages: [
          {
            title: String,
            content: String,
            answer: String
          }
        ],  
      }
    ]
  }
 */
