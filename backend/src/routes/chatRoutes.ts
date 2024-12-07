import { Router } from "express";
import { getChat } from "../controllers/chatController";

const router = Router();

router.post("/chat", getChat);

export default router;
