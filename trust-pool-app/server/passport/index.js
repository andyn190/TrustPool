const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const session = require('cookie-session');
const { SESSION_OPTS, GOOGLE_KEYS } = require('../config');

module.exports = (app) => {
  app.use(session(SESSION_OPTS));
  app.use(passport.initialize());
  app.use(passport.session());

  // passport.serializeUser((user, done) => done(null, user.id));
  // passport.deserializeUser((id, done) => {
  //   
  // });

  passport.use(new GoogleStrategy({
    callbackURL: '/login/google/redirect',
    clientID: GOOGLE_KEYS.CLIENT_ID,
    clientSecret: GOOGLE_KEYS.CLIENT_SECRET,
  }, (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, 'Access Token');
    console.log(refreshToken, 'Refresh Token');
    console.log(profile, 'Profile');
    done();
  }));
};
