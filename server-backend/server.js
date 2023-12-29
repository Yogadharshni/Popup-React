// cors-proxy.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

app.post('/webhook', async (req, res) => {
  try {
    const webhookURL = 'https://webhook.site/39c80bc7-ea83-4e53-86c7-4cec3e0b3d07'; // Replace with your actual webhook URL
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Request to webhook failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    res.json(responseData);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`CORS proxy server is running on http://localhost:${port}`);
});

