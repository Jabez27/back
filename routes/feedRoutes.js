// feedRoutes.js backend

const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer'); // Import multer for handling file uploads
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});

const upload = multer({ storage: storage });

// POST route for creating feed updates with images
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { content , image } = req.body;
        const username = req.user.username;
        const createdAt = new Date();
        const authToken = req.authToken;
        
        const newFeed = new Feed({
            username,
            content,
            image: image,
            createdAt,
        });

        await newFeed.save();

        res.status(201).json({ message: 'Feed update created successfully' });
    } catch (error) {
        console.error('Error creating feed update:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET route for retrieving feed updates
router.get('/', async (req, res) => {
    try {
        const feedUpdates = await Feed.find().sort({ createdAt: -1 });
        res.status(200).json(feedUpdates);
    } catch (error) {
        console.error('Error retrieving feed updates:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
