const express = require('express');

const pools = express.Router();

pools.get('/', (req, res) => {
  res.status(200).send('sent get request to pools');
});

module.exports = pools;