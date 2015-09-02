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
          title: String,
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

