var Promise = require('bluebird');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('schoolio', 'root', '');

var Tables = {};


Tables.Page = sequelize.define('Page', {
  title: Sequelize.STRING,
  content: Sequelize.STRING,
  index: Sequelize.INTEGER
});

Tables.Project = sequelize.define('Project', {
  name: Sequelize.STRING,
  subject: Sequelize.STRING,
  author: Sequelize.STRING
});

Tables.Class = sequelize.define('Class', {
  name: Sequelize.STRING
});

Tables.Student = sequelize.define('Student', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
});

Tables.Teacher = sequelize.define('Teacher', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING
});

var addRelations = function () {
  Tables.Project.hasMany(Tables.Page);
  Tables.Teacher.hasMany(Tables.Project);
  Tables.Teacher.hasMany(Tables.Class);
  
  // we need many to many for students and projects

  Tables.Student.hasMany(Tables.Class);
};

var reportSuccessOf = function (tableName) {
  return function () {
    console.log(tableName + ' table successfully synced.');
  };
};

var sync = function (tableName) {
  return Tables[tableName].sync().then(reportSuccessOf(tableName));
};

Promise.join(sync('Page'), sync('Project'), sync('Class'), sync('Student'), sync('Teacher'), addRelations);

