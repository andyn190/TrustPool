const user = require('express').Router();
const { findUserByGoogle } = require('./../../database/helpers');
const { findUserByGoogleAndUpdate } = require('./../../database/helpers');
const { findUserById } = require('./../../database/helpers');

user.get('/', (req, res) => {
  const userCookie = req.user;
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

user.get('/:id', (req, res) => {
  const { params } = req;
  const { id } = params;
  findUserById(id)
    .then(resUser => res.status(200).json({ user: resUser }))
    .catch(err => res.status(404).json({ err }));
});

module.exports = user;
