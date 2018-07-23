const pools = require('express').Router();
let stripe = require('stripe');
let mailgun = require('mailgun-js');
const cloudinary = require('cloudinary');
const percent = require('percent');

const {
  createPool,
  findPoolById,
  findPoolByName,
  findAllPools,
  findPublicPools,
  createPoolMember,
  createJoinRequest,
  findUserByGoogle,
  findAllPoolMembers,
  updatePool,
  getJoinRequests,
  findPoolMember,
  createContribution,
  findPoolByMember,
  createExpenseRequest,
  createExpenseRequestLink,
  updateCurrentRequest,
  createCheckEntry,
  findExpenseRequests,
  executeDeliveryMethod,
  updateExpenseRequest,
  updateAllPoolMembers,
  updatePoolMember
} = require('./../../database/helpers');
const { STRIPEKEY } = require('../config');
const authenticated = require('../passport/authenticated');
const { CLOUDINARY } = require('../config');

const { MAILGUN } = require('../config');

const { apiKey, domain } = MAILGUN;
mailgun = mailgun({ apiKey, domain });
stripe = stripe(STRIPEKEY);

pools.get('/', (req, res) => {
  findPublicPools()
    .then(poolsArr => Promise.resolve(res.status(200).json(poolsArr)))
    .catch(err => res.status(500).send(err));
  // this will respond with all public pools
});

pools.post('/mailinvite', (req, res) => {
  const { body, user } = req;
  const { googleID } = user;
  const {
    email,
    message,
    poolName,
    poolId,
    url
  } = body;
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { first_name, last_name } = resUser;
      const notification = {
        from: 'Trust Pool App <me@samples.mailgun.org>',
        to: email,
        subject: `Invitaton from ${first_name} ${last_name} to join ${poolName}`,
        text: `

    You have received an invitation to join: ${poolName}
    Message from ${first_name}
    ${message}

    To join this pool click the following link twice (Once to sign up, again to request to join the pool): 
        ${url}/pools/${poolId}/join
    `
      };
      mailgun.messages().send(notification, (err, resBody) => {
        console.log(err, resBody);
        if (err) {
          return res.status(200).json({ err });
        }
        return res.status(200).json({ success: resBody });
      });
    })
    .catch(err => res.status(400).json({ err }));
});

pools.get('/:poolid/ismember', (req, res) => {
  const { user, params } = req;
  const { poolid } = params;
  const { googleID } = user;
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { id } = resUser;
      return findPoolMember(id, poolid)
        .then((member) => {
          if (member) {
            return Promise.resolve(res.status(200).json({ member }));
          }
          return Promise.resolve(res.status(200).json({ member: false }));
        });
    })
    .catch(err => res.status(400).json({ err }));
  // find poolmembers where poolid and userid
});

pools.get('/:poolid/joinrequests', (req, res) => {
  const { params } = req;
  const { poolid } = params;
  getJoinRequests(poolid)
    .then(joinRequests => Promise.resolve(res.status(200).json({ joinRequests })))
    .catch(err => res.status(500).json({ err }));
  // find poolmembers where poolid and userid
});

pools.post('/joinrequests', (req, res) => {
  const { body } = req;
  const { status, pool_id, user_id } = body.joinRequest;
  if (status === 'accepted') {
    return getJoinRequests(pool_id, user_id)
      .then(request => request[0].destroy())
      .then(() => createPoolMember(pool_id, user_id)
        .then(() => updatePool(pool_id, 'members_count', 1)))
      .then(() => Promise.resolve(res.status(200).json({ message: `${user_id} SUCCESSFULLY ADDED MEMBER TO POOl ${pool_id}` })))
      .catch(err => res.status(400).json({ err }));
  }
  return getJoinRequests(pool_id, user_id)
    .then(request => request[0].destroy())
    .then(() => Promise.resolve(res.status(200).json({ success: 'request declined!' })))
    .catch(err => res.status(400).json({ err }));
  // find poolmembers where poolid and userid
});

pools.get('/:poolId', (req, res) => {
  const { poolId } = req.params;
  findPoolById(poolId)
    .then((pool) => {
      if (pool) {
        return Promise.resolve(res.status(200).json({ pool }));
      }
      return Promise.resolve(res.status(200).json({ error: 'Pool Not Found' }));
    })
    .catch(err => res.status(500).send(err));
  // this will respond with the pool requested
});

pools.get('/:poolId/expenserequests', (req, res) => {
  const { poolId } = req.params;
  findExpenseRequests(poolId)
    .then((pool) => {
      if (pool) {
        return Promise.resolve(res.status(200).send(pool));
      }
      return Promise.resolve(res.status(200).send({ error: 'Pool Not Found' }));
    })
    .catch(err => res.status(500).send(err));
  // this will respond with the pool requested
});

pools.post('/:requestId/accept', (req, res) => {
  const { params, body } = req;
  const { requestId } = params;
  const {
    votePower,
    memberId,
    poolMembersCount,
    voteConfig,
    poolId
  } = body;
  updateExpenseRequest(requestId, 'vote_up', votePower)
    .then((request) => {
      const { id } = request;
      return updateExpenseRequest(id, 'voter_count', 1);
    })
    .then((request)=>{
      const { id, voter_count } = request;
      return updateExpenseRequest(id, 'member_vote_percent', percent.calc(voter_count, poolMembersCount, 0));
    })
    .then((requestEntry) => {
      const { voter_count, vote_up, method } = requestEntry;
      const methodLink = method;
      if (vote_up >= voteConfig) {
        // executeDeliveryMethod(methodLink)
        return executeDeliveryMethod(methodLink)
          .then(updatedRequest => res.status(200).json({ success: { concluded: 'VOTE PASSED', updatedRequest } }))
          .then(() => updateExpenseRequest(requestId, 'active_status', 'passed'))
          .then(() => updateCurrentRequest(poolId))
          .then(() => updateAllPoolMembers(poolId, 'has_voted', null))
          .catch(deliveryErr => console.log(deliveryErr));
      }
      if (voter_count === poolMembersCount) {
        return updateExpenseRequest(requestId, 'active_status', 'failed')
          .then(() => updateCurrentRequest(poolId))
          .then(() => updateAllPoolMembers(poolId, 'has_voted', null))
          .then(() => Promise.resolve(res.status(200).json({ success: { concluded: 'VOTE POWER NOT MET' } })));
      }
      return updatePoolMember(null, null, 'has_voted', 't', memberId)
        .then(() => Promise.resolve(res.status(200).json({ success: 'vote to accept submitted' })));
    })
    .catch(err => res.status(200).json({ err }));
});

pools.post('/:requestId/decline', (req, res) => {
  const { params, body } = req;
  const { requestId } = params;
  const {
    votePower,
    memberId,
    poolMembersCount,
    voteConfig,
    poolId
  } = body;

  updateExpenseRequest(requestId, 'vote_down', votePower)
    .then((request) => {
      const { id } = request;
      return updateExpenseRequest(id, 'voter_count', 1);
    })
    .then((request) => {
      const { id, voter_count } = request;
      return updateExpenseRequest(id, 'member_vote_percent', percent.calc(voter_count, poolMembersCount, 0));
    })
    .then((requestEntry) => {
      const { voter_count, vote_down } = requestEntry;
      if (vote_down >= voteConfig) {
        // request entry active status === failed
        return updateExpenseRequest(requestId, 'active_status', 'failed')
          .then(() => updateCurrentRequest(poolId))
          .then(() => updateAllPoolMembers(poolId, 'has_voted', null))
          .then(() => Promise.resolve(res.status(200).json({ success: { concluded: 'VOTE NOT PASSED' } })));
      }
      if (voter_count === poolMembersCount) {
        return updateExpenseRequest(requestId, 'active_status', 'failed')
          .then(() => updateCurrentRequest(poolId))
          .then(() => updateAllPoolMembers(poolId, 'has_voted', null))
          .then(() => Promise.resolve(res.status(200).json({ success: { concluded: 'VOTE POWER NOT MET' } })));
      }
      return updatePoolMember(null, null, 'has_voted', 't', memberId)
        .then(() => Promise.resolve(res.status(200).json({ success: 'vote to decline submitted' })));
    })
    .catch((err) => {
      if (err) res.status(200).json({ err });
    });
});

pools.post('/create', (req, res) => {
  const { user, body } = req;
  const {
    name,
    imgUrl64,
    desc,
    voteConfig,
    publicOpt
  } = body.pool;
  const options = {
    tags: name,
    api_key: CLOUDINARY.api_key,
    cloud_name: CLOUDINARY.cloud_name,
    api_secret: CLOUDINARY.api_secret
  };
  cloudinary.v2.uploader.upload(imgUrl64, options, (err, response) => {
    if (err) {
      return res.status(400).json({ err, type: 'CLOUD' });
    }
    const imgURL = response.url;
    const { googleID } = user;
    return findUserByGoogle(googleID)
      .then((resUser) => {
        const { id } = resUser;
        return findPoolByName(name)
          .then((pool) => {
            if (pool) {
              res.status(400).json({ error: 'POOL ALREADY EXISTS' });
              return Promise.reject(new Error('POOL AREADY EXISTS'));
            }
            return createPool(name, imgURL, desc, voteConfig, id, publicOpt)
              .then((result) => {
                res.status(200).json(result);
                Promise.resolve('POOL');
              });
          });
      })
      .catch(promiseErr => res.status(500).json({ promiseErr }));
  });
});

pools.post('/expenselink', (req, res) => {
  const { method } = req.body;
  createExpenseRequestLink(method)
    .then(link => Promise.resolve(res.status(200).json({ link })))
    .catch(err => res.status(200).json({ err }));
});

pools.post('/expense', (req, res) => {
  const { body, user } = req;
  const {
    pool_id,
    request_title,
    description,
    expense_amount,
    expiration_date,
    method,
    poolValue
  } = body;

  const { googleID } = user;
  if (poolValue < expense_amount) {
    return res.status(400).json({ error: 'The request amount is larger than the Pool Value' });
  }
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { id } = resUser;
      return createExpenseRequest(
        pool_id,
        id,
        request_title,
        description,
        expense_amount,
        expiration_date,
        method
      )
        .then(expenseRequestEntry => Promise.resolve(res.status(200).json({ expenseRequestEntry })))
        .then(() => updateCurrentRequest(pool_id));
    })
    .catch(err => res.status(400).json({ err }));
});

pools.post('/check', (req, res) => {
  const {
    amount,
    name,
    email,
    address,
    description,
    methodId
  } = req.body;
  if (address) {
  return createCheckEntry(amount, name, email, description, methodId, address)
    .then(check => res.status(200).json(check))
    .catch(err => res.status(400).json(err));
  }
  return createCheckEntry(amount, name, email, description, methodId)
    .then(check => res.status(200).send(check))
    .catch(err => res.status(400).send(err));
});

pools.post('/contribute', (req, res) => {
  const { body, user } = req;
  const {
    poolId,
    amount,
    stripeToken
  } = body;
  const token = stripeToken;
  const { googleID } = user;

  // Pay with stripe,
  // if stripe payment is accepted,
  // create a contributtion entry into db

  // Create a new customer and then a new charge for that customer:
  // stripe.customers.create({
  //   email: 'foo-customer@example.com'
  // })
  //   .then(customer => stripe.customers.createSource(customer.id, {
  //     source: stripeToken
  //   }))
  //   .then(source => stripe.charges.create({
  //     amount: 1600,
  //     currency: 'usd',
  //     customer: source.customer
  //   }))
  //   .then((charge) => {
  //     console.log(charge, 'CHARGE');
  //     // New charge created on a new customer
  //   })
  //   .catch((err) => {
  //     console.log(err, 'ERROR');
  //     // Deal with an error
  //   });

  stripe.charges.create({
    amount,
    currency: 'usd',
    source: 'tok_visa' || token
  }, (err, charge) => {
    if (err && err.type === 'StripeCardError') {
      return res.status(400).json({ error: 'CARD DECLINED' });
    }
    if (err) {
      return res.status(400).json({ err });
    }
    return findUserByGoogle(googleID)
      .then((resUser) => {
        const { id } = resUser;
        // create contribution entry
        return createContribution(poolId, id, amount);
      })
      .then(contribution => Promise
        .resolve(res.status(200).json({ success: { charge, contribution } })))
      .catch(dberr => res.status(200).json({ dberr }));
  });
});

pools.post('/join', (req, res) => {
  const { body, user } = req;
  const { poolid, socialUser } = body;
  let isMemberCheck = false;
  const { googleID } = user;
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { id, first_name, last_name } = resUser;
      return findAllPoolMembers(poolid)
        .then((poolMembers) => {
          poolMembers.forEach((member) => {
            const { dataValues } = member;
            const { pool_member_id } = dataValues;
            if (pool_member_id === id) {
              isMemberCheck = true;
            }
          });
          if (isMemberCheck) {
            return Promise.reject(res.status(409).send(`${socialUser || googleID} is already a member of pool ${poolid}`));
          }
          return getJoinRequests(poolid, id)
            .then((requests) => {
              if (requests[0]) {
                return Promise.reject(res.status(400).json({ error: 'YOU HAVE ALREADY SUBMITTED A JOIN REQUEST' }));
              }
              return createJoinRequest(id, poolid, `${first_name} ${last_name}`)
                .then(() => Promise.resolve(res.status(200).json({ message: 'SUCCESSFULLY CREATED JOIN POOL REQUEST' })));
            });
        });
    })
    .catch(err => res.status(500).json({ err }));
});

pools.get('/:poolid/join', authenticated, (req, res) => {
  const { poolid } = req.params;
  const { user } = req;
  let isMemberCheck = false;
  const { googleID } = user;
  findUserByGoogle(googleID)
    .then((resUser) => {
      const { id } = resUser;
      return findAllPoolMembers(poolid)
        .then((poolMembers) => {
          poolMembers.forEach((member) => {
            const { dataValues } = member;
            const { pool_member_id } = dataValues;
            if (pool_member_id === id) {
              isMemberCheck = true;
            }
          });
          if (isMemberCheck) {
            return Promise.reject(res.status(409).send(`${googleID} is already a member of pool ${poolid}`));
          }
          // create join pool request
          // check if existing join pool request
          return getJoinRequests(poolid, id)
            .then((requests) => {
              if (requests[0]) {
                return Promise.reject(res.status(400).json({ error: 'YOU HAVE ALREADY SUBMITTED A JOIN REQUEST' }));
              }
              return createJoinRequest(id, poolid)
                .then(() => Promise.resolve(res.status(200).json({ message: 'SUCCESSFULLY CREATED JOIN POOL REQUEST' })));
            });
        });
    })
    .catch(err => res.status(500).json({ err }));
});

pools.post('/chat', (req, res) => {
  const { poolId, userId, message } = req.body;
  res.status(200).send(`recieved request for ${userId} to chat in pool ${poolId}`);
});

pools.get('/member/poolsOfMember', (req, res) => {
  const { user } = req;
  findPoolByMember(user.googleID)
    .then((data) => {
      res.status(200).send(data);
    }).catch(err => res.status(500).json({ err }));
});

module.exports = pools;
