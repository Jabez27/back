// messageRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');

router.post('/:chatroomid', authMiddleware, async (req, res) => {
  try {
    const chatroomid = req.params.chatroomid; // Corrected
    console.log('Chatroom ID (POST):', chatroomid); 
    const { message } = req.body;
    const username = req.user._id;
    const newMessage = new Message({
      chatroomid,
      message,
      username,
    });
    const savedMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:chatroomid', authMiddleware, async (req, res) => {
  try {
    const chatroomid = req.params.chatroomid; // Corrected
    const messages = await Message.find({ chatroomid }).populate('username');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
