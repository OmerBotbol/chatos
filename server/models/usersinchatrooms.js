'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersInChatRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsersInChatRooms.init(
    {
      user_id: DataTypes.INTEGER,
      chat_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UsersInChatRooms',
      tableName: 'users_in_chat_rooms',
      underscored: true,
    }
  );
  return UsersInChatRooms;
};
