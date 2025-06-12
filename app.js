import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
  { role: "user", parts: [{ text: "how are you?" }] },
  { role: "model", parts: [{ text: "I am fine what about you?" }] },
  { role: "user", parts: [{ text: "I am absolutely fine. So, tell me about the company zoho corporation?" }] }
],
  });
  console.log(response.text);
}

main();