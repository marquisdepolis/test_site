const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Endpoint to provide the Google Client ID to the frontend
app.get('/api/client-id', (req, res) => {
  res.json({ clientId: process.env.CLIENT_ID });
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
