const logout = require('express').Router();

logout.get('/', (req, res) => {
  req.logOut();
  res.redirect('/');
});


module.exports = logout;
