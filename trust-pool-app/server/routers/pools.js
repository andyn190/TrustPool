const express = require('express');

const pools = express.Router();

pools.get('/', (req, res) => {
  res.status(200).send('sent get request to pools');
  // this will respond with all public pools
});

pools.get('/:poolId', (req, res) => {
  res.status(200).send(`sent request to get pool ${req.params.poolId}`);
  // this will respond with the pool requested
});

pools.post('/', (req, res) => {
  res.status(200).send('sent post request to pools');
});

module.exports = pools;