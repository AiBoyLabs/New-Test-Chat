const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();

// Simplified CORS setup
app.use(cors({
    origin: '*', // For development - we'll restrict this later
    methods: ['GET', 'POST']
}));

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Add this route before the chat route
app.get('/', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gpt-3.5-turbo",
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 
