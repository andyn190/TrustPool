const user = require('express').Router();

user.get('/', (req, res) => {
  
  res.status(200).send('recieved get request to log out');
});


module.exports = user;
