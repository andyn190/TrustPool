const pools = require('express').Router();

pools.get('/', (req, res) => {
  res.status(200).send('recieved get request to pools');
  // this will respond with all public pools
});

pools.get('/:poolId', (req, res) => {
  res.status(200).send(`recieved request to get pool ${req.params.poolId}`);
  // this will respond with the pool requested
});

pools.post('/create', (req, res) => {
  const { name, imgUrl, desc, voteConfig, creatorId, public } = req.body.pool;
  res.status(200).send(`recieved post request to create new pool named ${name}`);
});

pools.post('/expense', (req, res) => {
  const { poolId, creatorId, title, desc, amount, expiration, method } = req.body;
  res.status(200).send(`recieved request to create new expense request in pool ${poolId}`);
});

pools.post('/vote', (req, res) => {
  const { poolId, memberId, vote } = req.body;
  res.status(200).send(`recieved request for member ${memberId} to vote ${vote} in pool ${poolId}`);
});

pools.post('/contribute', (req, res) => {
  const { poolId, memberId, amount } = req.body;
  res.status(200).send(`recieved request for member ${memberId} to contribute to pool ${poolId}`);
});

pools.post('/join', (req, res) => {
  const { poolId, userId } = req.body;
  res.status(200).send(`recieved request for ${userId} to join pool ${poolId}`);
});

pools.post('/chat', (req, res) => {
  const { poolId, userId, message } = req.body;
  res.status(200).send(`recieved request for ${userId} to chat in pool ${poolId}`);
});

module.exports = pools;