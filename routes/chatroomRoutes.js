const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Chatroom = require('../models/Chatroom');

// Create a new chatroom
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { groupName, classValue, section } = req.body;
    const createdBy = req.user._id;
    const chatroom = new Chatroom({ groupName, classValue, section, createdBy });
    await chatroom.save();

    res.status(201).json(chatroom);
  } catch (error) {
    console.error('Error creating chatroom:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { classValue, section } = req.query;
    let query = {};

    if (classValue && section) {
      query = { classValue, section };
    } else if (classValue) {
      query = { classValue };
    }

    const chatrooms = await Chatroom.find(query);
    if (!chatrooms) {
      return res.status(404).json({ message: 'No chatrooms found' });
    }
    res.status(200).json(chatrooms);
  } catch (error) {
    console.error('Error fetching chatrooms:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
