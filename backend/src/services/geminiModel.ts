import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { systemInstruction } from "./systemInstruction";

dotenv.config();

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY is not defined in the environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: systemInstruction,
  generationConfig: {
    maxOutputTokens: 500,
    temperature: 0.7,
  },
});

export const chatSession = model.startChat({
  history: [],
});
