import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";
import "dotenv/config";

// connecting mcpServer to Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });

const conversationHistory = [];

async function mcpServer() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: conversationHistory,
    });
    return response.text;
  } catch (err) {
    console.error("Error generating content:", err);
  }
}
// mcpServer();

async function getWeather(location) {
  for (const { city, date } of location) {
    const weatherInfo = [];
    if (date.toLowerCase() === "today") {
      const respone = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=5a538533abaa421394e140114241203&q=${city}`
      );
      const data = await respone.json();
      weatherInfo.push(data);
    } else {
      const respone = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=5a538533abaa421394e140114241203&q=${city}&dt=${date}`
      );
      const data = await respone.json();
      weatherInfo.push(data);
    }

    return weatherInfo;
  }
}

async function chatting(params) {
  const userQuestion = readlineSync.question("How can I help you?  ");
  const prompt = `
  You are an AI agent, who will respond to me in JSON format only.
  Analyse the user query and try to fetch city and date details from it.
  Date format should be in (yyyy-month-date) if user ask for future weather.
  If user ask for today weather, mark date as 'today'.
  To fetch weather details, I already have some function which can fetch the weather details for me,

  If you need the weather use the below format
  JSON format should look like below:
  {
    "weather_details_needed": boolean,
    "location": [{"city":"mumbai", "date":"today"}, {"city":"delhi", "date":"2025-04-30"}]
  }

  Once you have weather details, respond me in JSON format only:
  JSON format should look like below:
  {
    "weather_details_needed": false,
    "weather_report": "Delhi temperature is normal and clear, its 24 degree go and have fun outside",
  }

  user asked this question: ${userQuestion}
  Strictly follow this JSON format, respond only in JSON format
  `;
  conversationHistory.push({
    role: "user",
    parts: [{ text: prompt }],
  });

  while (true) {
    let response = await mcpServer();
    conversationHistory.push({ role: "model", parts: [{ text: response }] });
    response = response.replace(/^```json\s*|```$/gm, "").trim();
    const data = JSON.parse(response);

    if(data.weather_details_needed == false){
      console.log(data.weather_report);
      break;
    }


    const weatherInformation = await getWeather(data.location); // give info in array
    const weatherInfo = JSON.stringify(weatherInformation); // converting to string
    conversationHistory.push({ role: "user", parts: [{ text: weatherInfo }] });
  }
}

chatting();

// export default mcpServer;
