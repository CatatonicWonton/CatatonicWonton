var sequelize = require('sequelize');
var tables = require('./db.js');

// tables.Student.create({
//   firstName: 'Mychael',
//   lastName: 'Zuniga'
// }).then(function (student) {
//   console.log(student.get({plain: true}));
// });

// tables.Project.create({
//   name: 'Hello World',
//   subject: 'Comp Sci',
//   author: 'Mychael Zuniga'
// }).then(function (project) {
//   console.log(project);
//   tables.Page.create({
//     title: 'Make Comp Think',
//     content: 'hello',
//     index: 3,
//     projectId: 1
//   }).then(function (page) {
//     console.log(page.get({plain: true}));
//   })
//   return project;
// }).then(function (project) {
//   console.log(project.getPages({plain: true}));
// });

tables.Project.create({
  name: 'JavaScript 101',
  subject: 'Comp Sci',
  author: 'Mychael Zuniga'
});

tables.Page.create({
  title: 'lol',
  content: 'you can do this1',
  index: 1
});

tables.Teacher.create({
  firstName: 'Mychael',
  lastName: 'Zuniga'
});

tables.Student.create({
  firstName: 'Devon',
  lastName: 'Koch'
});
// tables.Project.findAll({where: {name: 'Hello World'}}).then(function (project) {
//   console.log(project.dataValues);
//   // tables.Page.create({
//   //   title: 'Make 1st Program',
//   //   content: 'You can do this!',
//   //   index: 4,
//   //   projectId: project.dataValues.id
//   // }).then(function (page) {
//   //   console.log(page.get({plain: true}));
//   // });
//   return project;
// })