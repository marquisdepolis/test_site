// config/passport-setup.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: SECRET_KEY,
    callbackURL: "http://localhost:3000/oauth2callback" //"https://test-site-marquisdepolis.vercel.app/oauth2callback" //
}, (accessToken, refreshToken, profile, done) => {
    // Here, you would typically find or create a user in your database.
    console.log(profile);
    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Here, you would fetch the user from your database using the id.
    done(null, id);
});
