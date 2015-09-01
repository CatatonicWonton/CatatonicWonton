/* TABLES */

var Sequelize = require('sequelize');
var sequelize = new Sequelize('schoolio', 'root', '');

var Student = sequelize.define('Student', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
});

var Class = sequelize.define('Class', {
  name: Sequelize.STRING
});

var Teacher = sequelize.define('Teacher', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

var Project = sequelize.define('Project', {
  name: Sequelize.STRING,
  subject: Sequelize.STRING,
  author: Sequelize.STRING,

});

var Page = sequelize.define('Page', {
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  index: Sequelize.INTEGER
});


Project.hasMany(Page, {as: 'pages'});


/*  */

