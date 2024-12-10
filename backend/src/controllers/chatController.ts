import { Request, Response } from "express";
import { sendMessageToAI } from "../services/geminiService";

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      res.status(400).send("Message is required.");
      return;
    }

    const aiResponse = await sendMessageToAI(userMessage);

    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chat controller:", error);
    res.status(500).send("An error occurred while getting the chat response.");
  }
};
