'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Chats',
      [
        {
          id: 1,
          name: 'friends',
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 2,
          name: 'best friends',
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 3,
          name: 'all of us',
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 4,
          name: 'new chat',
          created_at: '2021-07-19 13:29:47',
          updated_at: '2021-07-19 13:29:47',
        },
        {
          id: 5,
          name: 'my gang',
          created_at: '2021-07-19 13:38:14',
          updated_at: '2021-07-19 13:38:14',
        },
        {
          id: 6,
          name: 'brothers',
          created_at: '2021-07-19 13:49:53',
          updated_at: '2021-07-19 13:49:53',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Chats', null, {});
  },
};
