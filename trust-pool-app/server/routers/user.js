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
  const { body } = req;
  const { googleID } = req.user;
  findUserByGoogleAndUpdate(googleID, body)
    .then(() => res.status(200).json({ success: 'UPDATED USER' }))
    .catch(err => res.send(500).json({ err }));
});

user.get('/:id', (req, res) => {
  const { params } = req;
  const { id } = params;
  findUserById(id)
    .then(resUser => res.status(200).json({ user: resUser }))
    .catch(err => res.status(404).json({ err }));
});

module.exports = user;
