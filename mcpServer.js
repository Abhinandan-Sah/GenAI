import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'
// connecting mcpServer to Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

async function mcpServer(msg) {
  try{
    const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: msg || "Hello, how are you?",
  });
  return response.text;
  }
  catch(err){
    console.error("Error generating content:", err);
  }
}
mcpServer();

async function getWeather (){
  const data = await("");
  const jsonData = await data.json();
  if (!jsonData || !jsonData.weather) {
    throw new Error("Weather data not available");
  }
  return jsonData;
}

export default mcpServer;

