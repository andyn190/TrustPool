const express = require('express');

const login = express.Router();

login.post('/', (req, res) => {
  res.status(200).send('recieved post request to login');
});

module.exports = login;