const pools = require('express').Router();
const stripe = require('stripe');
const { createPool, findPoolByName, findAllPools } = require('./../../database/helpers');
const { STRIPEKEY } = require('../config');

stripe(STRIPEKEY);

pools.get('/', (req, res) => {
  findAllPools()
    .then((pools) => {
      res.status(200).send(pools);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // this will respond with all public pools
});



pools.get('/:poolName', (req, res) => {
  const { poolName } = req.params;
  findPoolByName(poolName)
    .then((pool) => {
      if(pool){
        res.status(200).send(pool);
      } else {
        res.status(200).send({error: 'Pool Not Found'});
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // this will respond with the pool requested
});



pools.post('/create', (req, res) => {
  const { name, imgUrl, desc, voteConfig, creatorId, public } = req.body.pool;
  findPoolByName(name)
    .then((pool) => {
      if (pool) {
        res.status(200).send({ error: 'POOL ALREADY EXISTS' });
      } else {
        createPool(name, imgUrl, desc, voteConfig, creatorId, public).then((result) => {
          res.status(200).send(result);
        }).catch((err) => {
          res.status(500).send(err);
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // res.status(200).send(`recieved post request to create new pool named ${name}`);
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
  const { poolId, memberId, amount, stripeToken } = req.body;
  // Pay with stripe, 
  // if stripe payment is accepted,
  // create a contributtion entry into db
  let charge = stripe.charges.create({
    amount,
    currency: 'usd',
    source: stripeToken,
  }, (err, charge) => {
    if(err && err.type === 'StripeCardError'){
      console.log('CARD DECLINED');
    }
  });
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