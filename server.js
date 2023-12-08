const express = require('express');
const { google } = require('googleapis');

const app = express();
const port = 3000; // or the port you are using

const oauth2Client = new google.auth.OAuth2(
  '149913241851-j6himeafqd5snvi98gt8ah7fa0meitqj.apps.googleusercontent.com', // Replace with your actual Client ID
  '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', // Replace with your actual Client Secret
  'http://localhost:3000/oauth2callback' // Replace with your actual redirect URI
);

// Set the scope you need for Gmail
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

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
