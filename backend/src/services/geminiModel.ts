import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 300,
    temperature: 1.0,
  },
});

// Start the chat with an initial system message
export const chat = model.startChat({
  history: [
    {
      role: "model",
      parts: [
        {
          text: "Hi! I'm Tina, your AI insurance consultant. Can I ask a few questions to recommend the best policy for you?",
        },
      ],
    },
  ],
});
