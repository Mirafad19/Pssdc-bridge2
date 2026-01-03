
// FILE PATH: api/webhook.js
// (You MUST create a folder named 'api' and put this file inside it)

const axios = require('axios');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { message, sender } = req.body;
        console.log("From:", sender, "Message:", message);

        const WA_INSTANCE = "YOUR_INSTANCE_ID";
        const WA_TOKEN = "YOUR_TOKEN";

        // 1. Process with Gemini (Logic would go here)
        const aiResponse = "Hello! Soso AI received your message: " + message;

        // 2. Send back to WhatsApp
        await axios.post(`https://wasenderapi.com/api/send?instance_id=${WA_INSTANCE}&access_token=${WA_TOKEN}`, {
            number: sender,
            type: 'text',
            message: aiResponse
        });

        return res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
  
