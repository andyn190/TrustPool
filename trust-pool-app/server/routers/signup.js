const signup = require('express').Router();

signup.get('/', (req, res) => {
  res.status(200).send('recieved get request to signup');
});

signup.post('/', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    imgUrl
  } = req.body;
  res.status(200).send(`recieved post request to signup user ${lastName}, ${firstName}`);
});

module.exports = signup;
