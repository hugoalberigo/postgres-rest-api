'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_game_biodata.init({
    user_game_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    bio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game_biodata',
  });
  return user_game_biodata;
};