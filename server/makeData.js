var sequelize = require('sequelize');
var tables = require('./db.js').Models;
var Promise = require('bluebird');

var pages = [];
var classes = [];
var teacher;

var makeClasses = function (me) {
  console.log('makeClasses ran!');
  teacher = me;
  classes.push(tables.Class.create({
    name: 'Bio'
  }).then(function (c) {
    c['setTeacher'](me);
  }));

  classes.push(tables.Class.create({
    name: 'Phy'
  }).then(function (c) {
    c['setTeacher'](me);
  }));

  classes.push(tables.Class.create({
    name: 'Chem'
  }).then(function (c) {
    c['setTeacher'](me);
  }));

  classes.push(tables.Class.create({
    name: 'Lit'
  }));

  classes.push(tables.Class.create({
    name: 'Eng'
  }));

  Promise.join.apply(null, classes.concat(makeProjects));
};


var makePages = function (project) {
  console.log('makePages ran')

  var addToProject = function (page) {
    project.addPage(page);
  };

  pages.push(tables.Page.create({
    title: 'Intro',
    content: 'Start your project',
    index: 1,
    solution: 'true' 
  }).then(addToProject));

  pages.push(tables.Page.create({
    title: 'Part I',
    content: '2+2',
    index: 2,
    solution: '4'
  }).then(addToProject));

  pages.push(tables.Page.create({
    title: 'Part II',
    content: '3*3',
    index: 3,
    solution: '9'
  }).then(addToProject));

  pages.push(tables.Page.create({
    title: 'End',
    content: 'Congrats',
    index: 4,
    solution: 'true'
  }).then(addToProject));

  pages.push(tables.Page.create({
    title: 'Derp',
    content: 'Meow',
    index: 1,
    solution: 'true'
  }));
};

var makeProjects = function () {
  console.log('makeProjects');
  tables.Project.create({
    name: 'Bug\'s Life',
    subject: 'Bio'
  })
  .then(function(project){
    return project.setTeacher(teacher);
  })
  .then(makePages);
};

tables.Teacher.create({
  firstName: "Mychael",
  lastName: "Zuniga",
  username: "mike",
  password: 'password'
})
.then(makeClasses);
