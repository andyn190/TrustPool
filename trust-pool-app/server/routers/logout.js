const logout = require('express').Router();

logout.post('/', (req, res) => {
  res.status(200).send('recieved post request to log out');
});


module.exports = logout;
