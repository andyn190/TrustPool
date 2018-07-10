const { findUserById, createChatMessage, findMessagesByChatId } = require('./../../database/helpers');

module.exports = (socket, io) => {
  // add listeners
  socket.on('join', (data) => {
    const { chatId, userId } = data;
    // get user id/name, chatId (for room)
    let userName;
    findUserById(userId)
      .then((user) => {
        userName = `${user.first_name} ${user.last_name}`;
        socket.join(data.chatId);
        return findMessagesByChatId(chatId);
      })
      .then((messages) => {
        socket.emit('getPrevMessages', { messages });
        socket.broadcast.to(chatId).emit('userHasJoined', { userName, message: 'has joined the room!' });
      })
      .catch(err => console.log(err));
  });

  socket.on('message', (data) => {
    const { chatId, userId, message } = data;
    let userName;
    findUserById(userId)
      .then((user) => {
        userName = `${user.first_name} ${user.last_name}`;
        return createChatMessage(chatId, userId, message, userName);
      })
      .then(() => io.in(chatId).emit('newMessage', { userName, message }))
      .catch(err => console.log(err));
  });

  socket.on('leave', (data) => {
    const { chatId, userId } = data;
    // get user id/name, chatId (for room)
    socket.leave(data.chatId);
    findUserById(userId)
      .then((user) => {
        const userName = `${user.first_name} ${user.last_name}`;
        console.log(`${user.first_name} ${user.last_name} is leaving room : ${chatId}`);
        socket.broadcast.to(chatId).emit('userHasLeft', { userName, message: 'has left the room!' });
      })
      .catch(err => console.log(err));
  });
};
