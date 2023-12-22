// routes/auth-routes.js
const express = require('express');
const router = express.Router();
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
    scope: ['profile', 'email']
}));

// // callback route for google to redirect to
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     res.send('You reached the callback URI');
// });

router.get('/oauth2callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect to welcome.
        res.redirect('/welcome.html');
    });

// router.get('/oauth2callback', passport.authenticate('google', {
//     successRedirect: '/welcome.html', // This will serve the welcome.html file from the public directory
//     failureRedirect: '/login' // Or wherever you want to redirect on failure
// }));

module.exports = router;
