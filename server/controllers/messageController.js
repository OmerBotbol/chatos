const models = require('../models');

const getMessagesByChatId = async (chatId) => {
  try {
    const chatMessages = await models.Messages.findAll(
      { where: { chat_id: chatId } },
      { raw: true }
    );
    return ['get-messages', chatMessages];
  } catch (err) {
    console.log(err);
    return ['error', err];
  }
};

module.exports = { getMessagesByChatId };
