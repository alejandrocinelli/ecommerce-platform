import { Router } from 'express';
import { configureChatController } from '../controllers/chatController.js';
const router = Router();

router.get('/chat',  configureChatController.chatUsers);

export default router;