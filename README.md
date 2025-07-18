# GenAI Project

A Node.js application that integrates with Google's Gemini AI to provide chat functionality with conversation history support.

## Features

- REST API endpoints for chat interactions
- Conversation history tracking
- Integration with Google's Gemini AI
- Express.js server

## Prerequisites

- Node.js installed on your system
- Google Gemini AI API key

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory and add your Google Gemini AI API key:
```
GOOGLE_GENAI_API_KEY=your_api_key_here
```

## Usage

Start the development server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default.

### API Endpoints

1. Simple Chat - `POST /chat`
   ```json
   {
     "message": "Your message here"
   }
   ```

2. Chat with History - `POST /chat/history`
   ```json
   {
     "id": "unique_conversation_id",
     "message": "Your message here"
     
     
   }
   ```

## Dependencies

- express: ^5.1.0
- @google/genai: ^1.4.0
- dotenv: ^16.5.0

## Developer
- Made with ❤️ by Abhinandan Sah

## License

ISC - International Standard Corporations