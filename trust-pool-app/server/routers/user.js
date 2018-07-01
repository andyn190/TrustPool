const user = require('express').Router();
const { findUserByGoogle } = require('./../../database/helpers');

user.get('/', (req, res) => {
  const userCookie = req.user;
  const { googleID } = userCookie;
  findUserByGoogle(googleID)
    .then(resUser => res.status(200).json({ user: resUser }))
    .catch(err => res.status(200).json({ err }));
});

module.exports = user;
