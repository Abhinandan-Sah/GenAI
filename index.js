import express from "express";
const app = express();
import main from "./aiChatting.js"
const PORT = process.env.PORT || 3000;

app.use(express.json());

const chattingHistory = {};

// const chattingHistory = {
// 1: [{role: "user", parts: {text: "hello, How are you?"}}, {role: "model", parts: {text: "I am fine, thank you!"}}, {role: "user", parts: {text: "What is your name?"}}, {role: "model", parts: {text: "I am a chatbot created by OpenAI."}}],
// 2: [{role: "user", parts: {text: "What is the weather like today?"}}, {role: "model", parts: {text: "I am not sure, but you can check a weather website."}}],
// 3: [{role: "user", parts: {text: "What is the capital of France?"}}, {role: "model", parts: {text: "The capital of France is Paris."}}],
// 4: [],
// 5: [],
// };

// We will store the chatbot history Here
// key: value pair
// key = id
// value = array

app.post('/chat/history', async(req, res)=>{
    const {id, message} = req.body;

    if (!id || !message) {
        return res.status(400).json({ error: "ID and message are required" });
    }

    if(!chattingHistory[id]){
      chattingHistory = [];
    }

    const History = chattingHistory[id];
    const promptRespond = await main(history);
    console.log(promptRespond);
    History.push({role: "user", parts: {text: message}});
    History.push({role: "model", parts: {text: promptRespond}});

});


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