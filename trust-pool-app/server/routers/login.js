const login = require('express').Router();
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const { passport } = require('../passport');

login.post('/', (req, res) => {
  const { token } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload.sub;
  }
  verify().catch((err) => { console.log(err) });
  res.status(200).send(token);
});

login.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

login.get('/', (req, res) => res.send({ user: req.user || null }));

login.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

module.exports = login;
