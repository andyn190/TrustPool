const user = require('express').Router();
const { findUserByGoogle } = require('./../../database/helpers');
const { findUserByGoogleAndUpdate } = require('./../../database/helpers');

user.get('/', (req, res) => {
  const userCookie = req.user;
  console.log(user);
  const { googleID } = userCookie;
  findUserByGoogle(googleID)
    .then(resUser => res.status(200).json({ user: resUser }))
    .catch(err => res.status(200).json({ err }));
});

user.post('/update', (req, res) => {
  const { body, user } = req;
  findUserByGoogleAndUpdate(user.googleID, body)
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  // console.log(user);
});

module.exports = user;
