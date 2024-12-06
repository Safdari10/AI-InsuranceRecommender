import { chat } from "./geminiModel";

export async function initializeChat(): Promise<string> {
  try {
    // Immediately send a follow-up message from the AI using the stream method
    const result = await chat.sendMessageStream([
      {
        text: "Start Conversation",
      },
    ]);

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

export async function sendMessageToTina(userMessage: string): Promise<string> {
  try {
    const result = await chat.sendMessageStream([
      {
        text: userMessage,
      },
    ]);

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
