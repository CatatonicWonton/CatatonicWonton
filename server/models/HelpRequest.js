module.exports = function (sequelize, DataTypes) {
  return sequelize.define('HelpRequest', {
    question: DataTypes.STRING,
    projectName: DataTypes.STRING,
    acknowledged: {type: DataTypes.BOOLEAN, defaultValue: false},
    resolved: {type: DataTypes.BOOLEAN, defaultValue: false}
  });
};