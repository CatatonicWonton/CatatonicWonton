module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Question', {
    studentInput: DataTypes.STRING,
    solution: DataTypes.STRING,
    order: DataTypes.INTEGER
  });
};