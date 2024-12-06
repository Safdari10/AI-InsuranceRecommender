// chatController.ts
import { Request, Response } from 'express';
import { sendMessageToTina } from '../services/geminiService'; 

export const getChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      res.status(400).json({ message: 'Message is required' });
      return;
    }

    const response = await sendMessageToTina(userMessage);
    res.status(200).json({ message: response });

  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ message: 'Internal Server Error', details: (error as Error).message });
  }
};
