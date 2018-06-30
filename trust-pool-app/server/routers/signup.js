const signup = require('express').Router();
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

signup.get('/', (req, res) => {
  res.status(200).send('recieved get request to signup');
});

signup.post('/', (req, res) => {
  const {firstName, lastName, email, password, imgUrl, token} = req.body;
  res.status(200).send(`recieved post request to signup user ${lastName}, ${firstName}`);
});

module.exports = signup;
