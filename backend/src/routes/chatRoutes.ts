import { Router } from 'express';
import { getChat, startChat } from '../controllers/chatController';

const router = Router();

router.get('/start-chat', startChat);
router.post('/chat', getChat);

export default router;