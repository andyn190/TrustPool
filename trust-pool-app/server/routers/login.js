const login = require('express').Router();
const { passport } = require('../passport');

login.post('/', (req, res) => {
  res.status(200).send('recieved post request to login');
});

login.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

login.get('/', (req, res) => res.send({ user: req.user || null }));

login.get('/google', passport.authenticate('google', {
  scope: ['profile'],
}));

module.exports = login;
