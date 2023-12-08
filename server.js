const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/client-id', (req, res) => {
  res.json({ clientId: process.env.CLIENT_ID });
});

app.use(express.static('.')); // Serve static files from the current directory

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
