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

/* 
  GET /projects/:id

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

 /* 
  POST /projects

  {
    name: String,
    subject: String,
    author: String,
    pages: [
      {
        title: String,
        content: String,
        answer: String
      },
    ],

  }
 */

/* 
  GET /class/:id
  
  {
    students: [
      {
        id: Number,
        name: String,
        {
          id: Id,
          firstName: String,
          lastName: String,
          subject: String,
          author: String,
          pages: [
            {
              title: String,
              content: String,
              answer: String
            },
          ],
        }
        currentPage: {
          title: String,
          timePageStarted: Time
        },

      },
    ]
  }
*/

/* 
  POST /class/:id

  {
    studentId: Id
  }
 */

/* 
  POST /students
  
  {
    firstName: String,
    lastName: String
  }
 */

