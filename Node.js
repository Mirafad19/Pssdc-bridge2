
// THIS IS YOUR BACKEND SCRIPT (Node.js)
// Host this on Render.com or Railway.app to get your Webhook URL

const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const WA_INSTANCE = "YOUR_INSTANCE_ID";
const WA_TOKEN = "YOUR_TOKEN";

app.post('/webhook', async (req, res) => {
    const message = req.body.message; // From WASenderAPI
    const sender = req.body.sender;
    
    console.log("New Message:", message);

    // 1. Send to Gemini with your Knowledge Base
    // 2. Get the response
    const aiResponse = "Hello! This is a reply from Gemini."; 

    // 3. Send back to WhatsApp via WASenderAPI
    await axios.post(`https://wasenderapi.com/api/send?instance_id=${WA_INSTANCE}&access_token=${WA_TOKEN}`, {
        number: sender,
        type: 'text',
        message: aiResponse
    });

    res.sendStatus(200);
});

app.listen(3000, () => console.log("AI Agent Bridge Live!"));
  