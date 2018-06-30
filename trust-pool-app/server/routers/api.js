const passport = require('passport');
const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');
const {
  findOrCreate,
  findOrCreateUser,
  findOne,
  findUserById,
  create,
  createPool,
  findPoolByName,
  findAllPools,
  findAll,
  createPoolMember,
  findUserByGoogle,
  findAllPoolMembers,
  updateMemberCount,
  findPoolById,
  isMember
} = require('../../database/helpers');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Express RESTful API');
});

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass a username and password' });
  } else {
    console.log(req.body.username, req.body.password);
  }
});

router.post('/signin', function (req, res) {
  
});

module.exports = router;
