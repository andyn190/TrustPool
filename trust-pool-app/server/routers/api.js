const api = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { Users } = require('../../database/index');

/* GET home page. */

api.post('/signup', (req, res) => {
  const {
    email, password, firstName, lastName
  } = req.body;
  if (!email || !password) {
    res.status(400).send({ success: false, msg: 'Please pass a username and password' });
  }
  Users.findOrCreate({
    where: {
      first_name: firstName, last_name: lastName, email, password
    }
  }).spread((user, created) => {
    console.log(user.get({ plain: true }));
    if (created) {
      res.send(user);
      res.end();
    } else {
      res.send('user was already created');
      res.end();
    }
  });
});

api.post('/signin', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.status(200).send('worked');
});

module.exports = api;
