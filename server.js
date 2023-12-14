const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(CLIENT_ID);

const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'https://test-site-marquisdepolis.vercel.app' // Adjust if necessary
}));

app.use(bodyParser.json());
app.use(express.static()); 
app.post('/verify-token', async (req, res) => {
    console.log("Received token: ", req.body.token); // Debugging line
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();

        if (payload) {
            const user = { userId: payload.sub };
            const token = jwt.sign(user, SECRET_KEY, { expiresIn: '24h' });
            res.json({ loggedIn: true, token: token });
        } else {
            res.json({ loggedIn: false });
        }
    } catch (error) {
        console.error("Error verifying token: ", error); // Debugging line
        res.json({ loggedIn: false });
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
  // This page would only be shown to authenticated users
  res.send('This is a protected page. Welcome!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
