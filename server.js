const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(express.json()); // Parse incoming JSON requests

app.post('/auth/google/callback', async (req, res) => {
  const { idToken } = req.body;
  const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  const userId = payload['sub'];

  // Use the user ID to create a session or authenticate the user in your system

  res.send({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});