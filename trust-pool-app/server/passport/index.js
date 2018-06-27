const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const session = require('cookie-session');
const { SESSION_OPTS, GOOGLE_KEYS } = require('../config');
const {
  findOrCreate,
  findOrCreateUser,
} = require('./../../database/helpers.js');

module.exports = (app) => {
  app.use(session(SESSION_OPTS));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    
  });

  passport.use(new GoogleStrategy({
    callbackURL: '/login/google/redirect',
    clientID: GOOGLE_KEYS.CLIENT_ID,
    clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, 'Access Token');
    console.log(refreshToken, 'Refresh Token');
    console.log(profile, 'Profile');
    const { name, _json, id} = profile; 
    const last_name = name.familyName;
    const first_name = name.givenName;
    const image_url = _json.image.url;
    console.log(image_url);
    findOrCreateUser(null, first_name, last_name, image_url, null, id)
      .then((user) => {done(null, user);})
      .catch((err) => { done(err, null);});
    
  }));
};
