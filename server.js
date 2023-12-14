const express = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '149913241851-j6himeafqd5snvi98gt8ah7fa0meitqj.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();
app.use(bodyParser.json());

app.post('/verify-token', async (req, res) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: CLIENT_ID
        });
        const payload = ticket.getPayload();

        // Create session logic here (can be with JWT or cookies)

        res.json({ loggedIn: true });
    } catch (error) {
        res.json({ loggedIn: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
