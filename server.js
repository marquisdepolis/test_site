const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000; // or the port you are using

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID, 
  process.env.CLIENT_SECRET, 
  process.env.REDIRECT_URI
);

// Set the scope you need for Gmail
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

const port = process.env.PORT || 3000;

// Endpoint to provide the Google Client ID to the frontend
app.get('/api/client-id', (req, res) => {
  res.json({ clientId: process.env.CLIENT_ID });
});

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.send('Hello World! - OAuth Test');
});

// Redirect to Google's OAuth 2.0 server
app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

app.get('/config', (req, res) => {
  res.json({ clientId: process.env.CLIENT_ID });
});

// Get the authentication response from Google
app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      return res.status(400).send('Error retrieving access token');
    }
    oauth2Client.setCredentials(tokens);
    res.send('Authentication successful! You can close this tab.');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
