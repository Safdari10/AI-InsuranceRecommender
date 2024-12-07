import { chatSession } from './geminiModel'; 


export const sendMessageToAI = async (userMessage: string) => {
  try {
    // Append user message to chat history
    if (chatSession.params?.history) {
      chatSession.params.history.push({
        role: "user",
        parts: [{ text: userMessage }],
      });
    }

    // Send the user message and get the response
    const result = await chatSession.sendMessageStream(userMessage);
     console.log(chatSession.params?.history);
    // Concatenate and handle streamed chunks for the AI's response
    let aiMessage = '';
    for await (const chunk of result.stream) {
      aiMessage += chunk.text(); 
    }

    // Append AI response to chat history
    if (chatSession.params?.history) {
      chatSession.params.history.push({
        role: "model",
        parts: [{ text: aiMessage }],
      });
    }

    // Return the final AI response
    return aiMessage;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    throw new Error("Failed to get a response from the AI.");
  }
};
