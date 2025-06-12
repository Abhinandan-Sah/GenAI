import { GoogleGenAI } from "@google/genai";
import 'dotenv/config'

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: msg || "Hello, how are you?",
  });
  return response.text;
}

main();

export default main;