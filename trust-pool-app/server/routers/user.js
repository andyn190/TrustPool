const user = require('express').Router();
const cloudinary = require('cloudinary');
const { findUserByGoogle } = require('./../../database/helpers');
const { findUserByGoogleAndUpdate } = require('./../../database/helpers');
const { findUserById } = require('./../../database/helpers');
const { CLOUDINARY } = require('../config');
const { ADMIN } = require('../config');


user.get('/', (req, res) => {
  const userCookie = req.user;
  const { googleID } = userCookie;
  findUserByGoogle(googleID)
    .then(resUser => res.status(200).json({ user: resUser }))
    .catch(err => res.status(200).json({ err }));
});

user.post('/update', (req, res) => {
  const { body, user } = req;
  const adminVerify = ADMIN.admin_password;
  if (body.admin === adminVerify) {
    body.admin = true;
  } else {
    body.admin = false;
  }
  const options = {
    tag: body.name,
    api_key: CLOUDINARY.api_key,
    cloud_name: CLOUDINARY.cloud_name,
    api_secret: CLOUDINARY.api_secret
  };
  if (body.photoID) {
    cloudinary.v2.uploader.upload(body.photoID, options, (err, response) => {
      if (err) {
        return res.status(400).json({ err, type: 'CLOUD' });
      }
      body.photoID = response.url;
      findUserByGoogleAndUpdate(user.googleID, body)
        .then((updatedUser) => {
          res.status(200).send(updatedUser);
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    });
  } else {
    findUserByGoogleAndUpdate(user.googleID, body)
      .then((updatedUser) => {
        res.status(200).send(updatedUser);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  }
});

user.get('/:id', (req, res) => {
  const { params } = req;
  const { id } = params;
  findUserById(id)
    .then(resUser => res.status(200).json({ user: resUser }))
    .catch(err => res.status(404).json({ err }));
});

module.exports = user;
