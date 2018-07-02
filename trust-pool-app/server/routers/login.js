const login = require('express').Router();
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const { passport } = require('../passport');
const { Users } = require('../../database/index');

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
    const {
      email, given_name, family_name, picture
    } = payload;
    Users.findOrCreate({
      where: {
        email, first_name: given_name, last_name: family_name, image_url: picture, googleID: userid
      }
    })
      .spread((user, created) => {
        console.log(user.get({
          plain: true
        }));
        if (!created) {
          res.status(200).send(payload);
        } else {
          res.status(200).send(user);
        }
      });
  }
  verify().catch((err) => {
    console.log(err);
  });
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
