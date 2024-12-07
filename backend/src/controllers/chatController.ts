import { Request, Response } from 'express';
import { sendMessageToAI } from '../services/geminiService';

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    // Retrieve the user's message from the request body
    const userMessage = req.body.message;
    if (!userMessage) {
      res.status(400).send('Message is required.');
      return;
    }

    // Send the user message to the AI and get the response
    const aiResponse = await sendMessageToAI(userMessage);

    // Return the AI's response to the client
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).send('An error occurred while getting the chat response.');
  }
};
