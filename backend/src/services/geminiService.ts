import { chat } from "./geminiModel";

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
