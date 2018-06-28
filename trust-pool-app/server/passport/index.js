const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const session = require('cookie-session');
const path = require('path');
const { SESSION_OPTS, GOOGLE_KEYS } = require('../config');
const {
  findOrCreate,
  findOrCreateUser,
  findUserById,
} = require('./../../database/helpers.js');

module.exports = { setupPassport: (app) => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    findUserById(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  passport.use(new GoogleStrategy({
    callbackURL: '/login/google/redirect',
    clientID: GOOGLE_KEYS.CLIENT_ID,
    clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    const { name, _json, id} = profile; 
    const last_name = name.familyName;
    const first_name = name.givenName;
    const image_url = _json.image.url;
    findOrCreateUser(null, first_name, last_name, image_url, null, id)
      .then(user => done(null, user))
      .catch(err =>  done(err));
  }));

  app.use(session(SESSION_OPTS));
  app.use(passport.initialize());
  app.use(passport.session());
}, passport,
};
