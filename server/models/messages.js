'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Messages.init(
    {
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      chat_id: DataTypes.INTEGER,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Messages',
      underscored: true,
    }
  );
  return Messages;
};
