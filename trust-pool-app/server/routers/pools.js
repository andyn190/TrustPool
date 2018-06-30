const pools = require('express').Router();
const stripe = require('stripe');
const {
  createPool,
  findPoolById,
  findPoolByName,
  findAllPools,
  createPoolMember,
  findUserByGoogle,
  findAllPoolMembers,
  updateMemberCount,
  isMember
} = require('./../../database/helpers');
const { STRIPEKEY } = require('../config');

stripe(STRIPEKEY);

pools.get('/', (req, res) => {
  findAllPools()
    .then((poolsArr) => {
      res.status(200).send(poolsArr);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // this will respond with all public pools
});

pools.get('/:poolid/ismember', (req, res) => {
  const { body, user, params } = req;
  const { poolid } = params;
  const { googleID } = user;
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { id } = resUser;
      isMember(id, poolid)
        .then((member) => {
          if (member) {
            res.status(200).json({ member });
          } else {
            res.status(200).json({ member: false });
          }
        })
        .catch(err => console.log(err));
    })
    .catch((err) => {});
  // find poolmembers where poolid and userid
});

pools.get('/:poolId', (req, res) => {
  const { poolId } = req.params;
  findPoolById(poolId)
    .then((pool) => {
      if (pool) {
        res.status(200).send(pool);
      } else {
        res.status(200).send({ error: 'Pool Not Found' });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
  // this will respond with the pool requested
});

pools.post('/create', (req, res) => {
  const {
    name,
    imgUrl,
    desc,
    voteConfig,
    creatorId,
    publicOpt
  } = req.body.pool;
  findPoolByName(name)
    .then((pool) => {
      if (pool) {
        res.status(200).send({ error: 'POOL ALREADY EXISTS' });
      } else {
        createPool(name, imgUrl, desc, voteConfig, creatorId, publicOpt)
          .then((result) => {
            res.status(200).send(result);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

pools.post('/expense', (req, res) => {
  const {
    poolId,
    creatorId,
    title,
    desc,
    amount,
    expiration,
    method } = req.body;
  res.status(200).send(`recieved request to create new expense request in pool ${poolId}`);
});

pools.post('/vote', (req, res) => {
  const { poolId, memberId, vote } = req.body;
  res.status(200).send(`recieved request for member ${memberId} to vote ${vote} in pool ${poolId}`);
});

pools.post('/contribute', (req, res) => {
  const {
    poolId,
    memberId,
    amount,
    stripeToken
  } = req.body;
  // Pay with stripe,
  // if stripe payment is accepted,
  // create a contributtion entry into db
  let charge = stripe.charges.create({
    amount,
    currency: 'usd',
    source: stripeToken
  }, (err, charge) => {
    if (err && err.type === 'StripeCardError') {
      console.log('CARD DECLINED');
    }
  });
  res.status(200).send(`recieved request for member ${memberId} to contribute to pool ${poolId}`);
});

pools.post('/join', (req, res) => {
  const { body, user } = req;
  const { poolid, socialUser } = body;
  let isMember = false;
  const { googleID } = user;
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { id } = resUser;
      findAllPoolMembers(poolid)
        .then((poolMembers) => {
          poolMembers.forEach((member) => {
            const { dataValues } = member;
            const { pool_member_id } = dataValues;
            if (pool_member_id === id) {
              isMember = true;
            }
          });
          if (isMember) {
            res.status(409).send(`${socialUser || googleID} is already a member of pool ${poolid}`);
          } else {
            createPoolMember(poolid, id)
              .then((success) => {
                // console.log(success, 'SUCCESSFULLY ADDED MEMBER TO POOl');
                updateMemberCount(poolid, 1);
                res.status(200).json({ message: `${socialUser || googleID} SUCCESSFULLY ADDED MEMBER TO POOl ${poolid}` });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

pools.post('/chat', (req, res) => {
  const { poolId, userId, message } = req.body;
  res.status(200).send(`recieved request for ${userId} to chat in pool ${poolId}`);
});

module.exports = pools;
