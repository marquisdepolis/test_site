// routes/auth-routes.js
const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.send('Logging in with Google');
});

// auth logout
router.get('/logout', (req, res) => {
    // Handle with Passport
    res.send('Logging out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('You reached the callback URI');
});

module.exports = router;
