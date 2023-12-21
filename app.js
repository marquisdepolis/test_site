// app.js
const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const app = express();
require('dotenv').config();
app.use(express.static('public'));

// Set up session cookies
app.use(session({
    secret: 'supercalifragilisticexpialidocious', // Replace with your secret key
    resave: true, 
    saveUninitialized: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);

// Home route
app.get('/', (req, res) => res.send('Home Page'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
