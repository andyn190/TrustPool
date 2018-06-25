const express = require('express');

const signup = express.Router();

signup.get('/', (req, res) => {
  res.status(200).send('sent get request to signup');
});

signup.post('/', (req, res) => {
  res.status(200).send('sent post request to signup');
});

module.exports = signup;