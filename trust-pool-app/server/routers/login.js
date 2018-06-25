const express = require('express');

const login = express.Router();

login.post('/', (req, res) => {
  res.status(200).send('sent post request to login');
});

module.exports = login;