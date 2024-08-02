const express = require('express');
var cors = require('cors')
const { GoogleGenerativeAI } = require('@google/generative-ai');


// Initialize your Express app
const app = express();
app.use(cors())
app.use(express.json()); // Middleware to parse JSON bodies

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI('AIzaSyDF-56qM2wmKc0YdGNrKamlnIhqkuNSluY');

app.get('/',(req,res)=>{
    res.send("Working")

})

// Route to generate content
app.post('/generate', async(req, res) => {
    try {
        // Choose a model that's appropriate for your use case
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Get the prompt from the request body
        const prompt = req.body.prompt;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required.' });
        }

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = await response.text(); // Await the text conversion

        res.json({ text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while generating content.' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});