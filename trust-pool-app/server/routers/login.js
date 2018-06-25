const login = require('express').Router();

login.post('/', (req, res) => {
  res.status(200).send('recieved post request to login');
});

login.post('/google', (req, res) => {
  res.status(200).send('recieved post request to login with google');
});

module.exports = login;