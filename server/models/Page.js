module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Page', {
    title: DataTypes.STRING,
    content: DataTypes.STRING(20000),
    index: DataTypes.INTEGER,
    solution: DataTypes.STRING
  });
};