import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Replace with your backend URL

export const sendMessageToAI = async (message: string, history: { role: string; text: string }[]) => {
  try {
    // Send only the necessary context (latest message + relevant history)
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message,
      history,
    });
    return response.data.response || response.data; // Ensure we get just the message text
  } catch (error) {
    console.error("Error communicating with the AI:", error);
    throw new Error("Failed to communicate with the AI.");
  }
};