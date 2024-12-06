import { Request, Response } from 'express';
import { initializeChat, sendMessageToTina } from '../services/geminiService';

export const startChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const aiResponse = await initializeChat();
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while starting the chat.');
  }
};

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userMessage = req.body.message;
    if (!userMessage) {
      res.status(400).send('Message is required.');
      return;
    }
    const aiResponse = await sendMessageToTina(userMessage);
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while getting the chat response.');
  }
};