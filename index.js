import express from "express";
const app = express();
import main from "./aiChatting.js"
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/chat', async(req, res)=>{
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    const ans = await main(message);
    
    // Here you would integrate with the Google GenAI API
    // For demonstration, we'll just echo the message back
    res.json({ response: `${ans}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});