// app.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const session = require('express-session');
const path = require('path');
const app = express();
require('dotenv').config();
app.use(express.static('public'));
const authRoutes = require('./routes/auth-routes');

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
// app.use('/auth', authRoutes);
app.use(authRoutes); // Note: No prefix here since your auth route is the full path

// Home route
app.get('/', (req, res) => res.send('Home Page'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
