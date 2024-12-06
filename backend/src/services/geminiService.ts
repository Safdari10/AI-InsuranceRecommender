require("dotenv").config();
const { GoogleGenerativeAI } = require("@google-cloud/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 300,
    temperature: 1.0,
  },
});

const chat = model.startChat({
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

export async function sendMessageToTina(userMessage: string): Promise<string> {
  try {
    const result = await chat.sendMessageStream(userMessage);
    let fullResponse = "";
    for await (const chunk of result.stream) {
      fullResponse += chunk.text();
    }
    return fullResponse;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw new Error("Failed to get a response from Tina.");
  }
}
