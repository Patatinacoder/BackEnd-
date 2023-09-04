import express from 'express';
import MessageService from '../services/MessagesService.js';

const messageRouter = express.Router();
const messageService = new MessageService();

messageRouter.get('/', async (req, res) => {
  try {
    const messages = await messageService.getMessages();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

messageRouter.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;
    await messageService.addMessage(user, message);
    res.status(201).json({ message: 'Message successfully added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default messageRouter;
