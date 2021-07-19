'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          username: 'omerBotbol',
          email: 'omerbot2@gmail.com',
          password:
            '$2b$10$ggXv3SjeY1bPNCZT93lo.OztDezKagvQx3x/OpFVVLY4g6/PdTj9m',
          image:
            'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
          created_at: '2021-07-19 12:22:11',
          updated_at: '2021-07-19 12:22:11',
        },
        {
          id: 2,
          username: 'lueiBotbol',
          email: 'lueibot2@gmail.com',
          password:
            '$2b$10$LCafi8ZdI5nNHKmn44Uc6.xb6gkD2Hu74GPOcyBlCjLcJKJqbjnky',
          image:
            'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
          created_at: '2021-07-19 12:22:36',
          updated_at: '2021-07-19 12:22:36',
        },
        {
          id: 3,
          username: 'botbolOmer',
          email: 'omerbo2@gmail.com',
          password:
            '$2b$10$b2Dk80c4m1Y8hit.HftS9OwRuERkBbqSKpmsI9ohSz.HvkdqztQJq',
          image:
            'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg',
          created_at: '2021-07-19 12:23:13',
          updated_at: '2021-07-19 12:23:13',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
