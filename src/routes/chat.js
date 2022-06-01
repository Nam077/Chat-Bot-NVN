import express from 'express';
let router = express.Router();
import chatController from '../controllers/chatController';

const initChatRoute = (app) => {
    router.post('/', chatController.Chat);
    router.get('/Chat', chatController.getChat);
    return app.use('/chat', router);
};
export default initChatRoute;
