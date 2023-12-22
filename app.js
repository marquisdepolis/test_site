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
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Set up session cookies
app.use(session({
    secret: 'supercalifragilisticexpialidocious', // Replace with your secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 24 hours, for example
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/auth', authRoutes);
app.use(authRoutes); // Note: No prefix here since your auth route is the full path

// Home route
app.get('/', (req, res) => res.send('Home Page'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
