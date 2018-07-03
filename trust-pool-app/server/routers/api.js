const api = require('express').Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
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
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      Users.findOne({ where: { email } }).then((account) => {
        if (account) {
          res.send('This account already exists!');
          res.end();
        } else {
          Users.create({
            first_name: firstName, last_name: lastName, email, password: hash
          }).then(() => {
            Users.findOrCreate({
              where: {
                first_name: firstName, last_name: lastName, email, password: hash
              }
            })
              .spread((user, created) => {
                console.log(user.get({ plain: true }));
                if (created) {
                  res.send('this user was created');
                  res.end();
                } else {
                  res.send(`${user.email.trim()} has been created`);
                  res.end();
                }
              });
          });
        }
      });
    }
  });
});

api.post('/signin', (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ where: { email } })
    .then((account) => {
      bcrypt.compare(password, account.password.trim()).then((bRes) => {
        if (bRes) {
          res.status(200).send(account);
          res.end();
        } else {
          res.status(404).send('wrong password');
          res.end();
        }
      }).catch((err) => {
        console.log(err);
        res.status(400).send(err);
        res.end();
      });
    });
});

module.exports = api;
