module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
};