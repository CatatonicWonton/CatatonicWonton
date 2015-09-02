module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
};