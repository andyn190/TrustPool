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
  }
  verify().catch((err) => {
    console.log(err);
  });
  const {
    email, given_name, family_name, picture
  } = payload;
  Users.findOne({
    where: {
      email, googleID: userid
    }
  }).then((user) => {
    if (user) {
      console.log('this was hit');
      res.status(200).send(user);
      res.end();
    } else {
      console.log(email, given_name, family_name, picture, userid);
      Users.create({
        email,
        googleID: userid,
        first_name: given_name,
        last_name: family_name,
        image_url: picture
      }).then((createdUser) => {
        res.status(200).send(createdUser);
        res.end();
      }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
    }
  });
});

login.get('/google/redirect', passport.authenticate('google', {
  successRedirect: '/#/home',
  failureRedirect: '/login'
}));

login.get('/', (req, res) => res.send({ user: req.user || null }));

login.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

module.exports = login;
