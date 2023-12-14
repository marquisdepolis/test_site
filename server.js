const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_KEY = process.env.GOOGLE_CLIENT_SECRET;
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const corsOptions = {
  origin: 'https://test-site-marquisdepolis.vercel.app/', // Replace with your frontend domain
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.post('/verify-token', async (req, res) => {
  console.log("Received token: ", req.body.token); // For debugging

  try {
      const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: process.env.CLIENT_ID
      });
      const payload = ticket.getPayload();

      if (payload) {
          console.log("Token verified successfully"); // For debugging
          // ...rest of your existing code...
      } else {
          console.log("Token verification failed"); // For debugging
          res.json({ loggedIn: false });
      }
  } catch (error) {
      console.error("Error verifying token: ", error);
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
