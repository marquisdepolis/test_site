// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: SECRET_KEY,
    callbackURL: "http://localhost:3000/oauth2callback" //"https://test-site-marquisdepolis.vercel.app/oauth2callback" //
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        done(null, existingUser);
      } else {
        new User({ googleId: profile.id })
          .save()
          .then(user => done(null, user));
      }
    });
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});
