module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Class', { 
    name: {type: DataTypes.STRING, unique: true}
  });
};