module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Project', {
    name: DataTypes.STRING,
    subject: DataTypes.STRING
  });
};