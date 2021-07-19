'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users_in_chat_rooms',
      [
        {
          id: 1,
          user_id: 1,
          chat_id: 2,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 2,
          user_id: 1,
          chat_id: 3,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 3,
          user_id: 2,
          chat_id: 1,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 4,
          user_id: 2,
          chat_id: 3,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 5,
          user_id: 3,
          chat_id: 1,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 6,
          user_id: 3,
          chat_id: 2,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 7,
          user_id: 3,
          chat_id: 3,
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 8,
          user_id: 1,
          chat_id: 4,
          created_at: '2021-07-19 13:29:47',
          updated_at: '2021-07-19 13:29:47',
        },
        {
          id: 9,
          user_id: 1,
          chat_id: 5,
          created_at: '2021-07-19 13:38:14',
          updated_at: '2021-07-19 13:38:14',
        },
        {
          id: 10,
          user_id: 1,
          chat_id: 6,
          created_at: '2021-07-19 13:49:53',
          updated_at: '2021-07-19 13:49:53',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users_in_chat_rooms', null, {});
  },
};
