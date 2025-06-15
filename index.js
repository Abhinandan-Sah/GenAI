import express from "express";
const app = express();
import main from "./aiChatting.js";
const PORT = process.env.PORT || 3000;

app.use(express.json());

const chattingHistory = {};

// const chattingHistory = {
// 1: [{role: "user", parts: [{text: "hello, How are you?"}], {role: "model", parts: [{text: "I am fine, thank you!"}]}, {role: "user", parts: [{text: "What is your name?"}]}, {role: "model", parts: [{text: "I am a chatbot created by OpenAI."}]}],
// 2: [{role: "user", parts: [{text: "What is the weather like?"}], {role: "model", parts: [{text: "I am not sure, but you can check a weather website."}]}],
// 3: [{role: "user", parts: [{text: "Tell me a joke."}]}, {role: "model", parts: [{text: "Why did the chicken cross the road? To get to the other side!"}]}],
// 4: [],
// 5: [],
// };

// We will store the chatbot history Here
// key: value pair
// key = id
// value = array

app.post("/chat/history", async (req, res) => {
  const { id, message } = req.body;

  if (!id || !message) {
    return res.status(400).json({ error: "ID and message are required" });
  }

  if (!chattingHistory[id]) {
    chattingHistory[id] = [];
  }

  const history = chattingHistory[id];

    // Format the message history correctly
    const formattedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts.text }]  // Ensure parts is always an array
    }));

    // Add the new message in correct format
    const promptMessage = [
      ...formattedHistory,
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

  const promptRespond = await main(promptMessage);
  console.log(promptRespond);
  history.push({ role: 'user', parts: { text: message } });
  history.push({ role: 'model', parts: { text: promptRespond } });
  res.json({ response: promptRespond});
});

app.post("/chat", async (req, res) => {
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
