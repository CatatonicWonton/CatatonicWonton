var config = require('./config/config');
var Promise = require('bluebird');
var Sequelize = require('sequelize');
var sequelize;

if (process.env.DATABASE_URL) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  sequelize = new Sequelize(match[5], match[1], match[2], {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     match[4],
      host:     match[3],
      logging: false,
      dialectOptions: {
          ssl: true
      }
  });
} else {
  sequelize = new Sequelize('schoolio', 'root', '', {logging: false});
}


// MODELS
var Models         = {};
Models.Class       = sequelize.import('./models/Class');
Models.Teacher     = sequelize.import('./models/Teacher');
Models.Student     = sequelize.import('./models/Student');
Models.Project     = sequelize.import('./models/Project');
Models.Question    = sequelize.import('./models/Question');
Models.Page        = sequelize.import('./models/Page');
Models.HelpRequest = sequelize.import('./models/HelpRequest');

// JOIN TABLES
Models.StudentClass   = sequelize.import('./models/StudentClass');
Models.StudentProject = sequelize.import('./models/StudentProject');
Models.ClassProject   = sequelize.import('./models/ClassProject');

// Adds Foreign Keys to Join Tables

// Students < -- > Projects
Models.Student.belongsToMany(Models.Project, {through: 'StudentProject'});
Models.Project.belongsToMany(Models.Student, {through: 'StudentProject'});

// Classes  < -- > Projects
Models.Class.belongsToMany(Models.Project, {through: 'ClassProject'});
Models.Project.belongsToMany(Models.Class, {through: 'ClassProject'});

// Classes  < -- > Students
Models.Student.belongsToMany(Models.Class, {through: 'StudentClass'});
Models.Class.belongsToMany(Models.Student, {through: 'StudentClass'});

// Adds Foreign Keys to Tables
// Models.Page.belongsTo(Models.Project);

Models.Class.belongsTo(Models.Teacher);

Models.Project.belongsTo(Models.Teacher);
// Models.Teacher.hasMany(Models.Project);
Models.Project.hasMany(Models.Page);

Models.Question.belongsTo(Models.Page);
Models.Question.belongsTo(Models.Project);
Models.Question.belongsTo(Models.Student);

// HELP REQUEST RELATIONS
Models.HelpRequest.belongsTo(Models.Student);
Models.HelpRequest.belongsTo(Models.Teacher);


if (process.env.NODE_ENV !== 'test') sequelize.sync(); // TODO comment

module.exports.Models = Models;
module.exports.sequelize = sequelize;



// var reportSuccessOf = function (tableName) {
//   return function () {
//     console.log(tableName + ' table successfully synced.');
//   };
// };

// var reportErrorFor = function (tableName) {
//   return function () {
//     console.log(tableName + ' table didn\'t sync.');
//   };
// }

// var sync = function (tableName) {
//   return function () {
//     return Models[tableName]
//       .sync()
//       .then(reportSuccessOf(tableName))
//       .error(reportErrorFor(tableName));
//   }
// };

// Models.Teacher.sync()
//   .then(sync('Project'))
//   .then(sync('Page'))
//   .then(sync('Class'))
//   .then(sync('Student'))
//   .then(sync('Question'))
//   .then(sync('StudentProject'))
//   .then(sync('StudentClass'));
