import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 300,
    temperature: 1.0,
  },
});

export const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "i am the applicant" }],
    },
    {
      role: "model",
      parts: [
        {
          text: "You are the AI model. Your name is Tina and you are  an insurance constultant for Turner's Insurance, welcome and respond to the applicatn accordingly.",
        },
      ],
    },
  ],
});
