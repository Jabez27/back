const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Message = require('../models/Message');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage});

router.post('/:chatroomid', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const chatroomid = req.params.chatroomid;
    const { message ,image } = req.body;
    const username = req.user._id;
    const newMessage = new Message({
      chatroomid,
      message,
      username,
      image:image,
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
    const chatroomid = req.params.chatroomid;
    const messages = await Message.find({ chatroomid }).populate('username');
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
