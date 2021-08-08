const app = require('express')();
const http = require('http').createServer(app);
const PORT = 5000;
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const { getMessagesByChatId } = require('./controllers/messageController');
const models = require('./models');

http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
  socket.on('join-chat', (chatId) => {
    socket.join(chatId);
    getMessagesByChatId(chatId)
      .then((result) => {
        socket.emit(result[0], result[1]);
      })
      .catch((err) => {
        socket.emit('error', err.message);
      });
  });

  socket.on('send-message', (message) => {
    models.Messages.create(message).then(() => {
      getMessagesByChatId(message.chat_id)
        .then((result) => {
          socket.broadcast.to(message.chat_id).emit(result[0], result[1]);
        })
        .catch((err) => {
          socket.broadcast.emit('error', err.message);
        });
    });
  });
});
