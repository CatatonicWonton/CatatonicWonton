var Promise = require('bluebird');
var Sequelize = require('sequelize');
var sequelize;

if (process.env.DATABASE_URL) {
  // use Postgres for deployment
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

Models.Class.belongsTo(Models.Teacher);

Models.Project.belongsTo(Models.Teacher);
Models.Project.hasMany(Models.Page);

Models.Question.belongsTo(Models.Page);
Models.Question.belongsTo(Models.Project);
Models.Question.belongsTo(Models.Student);

Models.HelpRequest.belongsTo(Models.Student);
Models.HelpRequest.belongsTo(Models.Teacher);


if (process.env.NODE_ENV !== 'test') sequelize.sync();

module.exports.Models = Models;
module.exports.sequelize = sequelize;