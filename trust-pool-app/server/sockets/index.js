const { findUserById } = require('./../../database/helpers');

module.exports = (socket) => {
  // add listeners
  socket.on('join', (data) => {
    const { chatId, userId } = data;
    // get user id/name, chatId (for room)
    socket.join(data.chatId);
    findUserById(userId)
      .then((user) => {
        const userName = `${user.first_name} ${user.last_name}`;
        console.log(`${user.first_name} ${user.last_name} joined the room : ${chatId}`);
        socket.broadcast.to(chatId).emit('userHasJoined', { userName, message: 'has joined the room!' });
      })
      .then(err => console.log(err));
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
      .then(err => console.log(err));
  });
};
