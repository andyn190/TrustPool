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
});

api.post('/signin', (req, res) => {
  const { email, password } = req.body;
  
});

module.exports = api;
