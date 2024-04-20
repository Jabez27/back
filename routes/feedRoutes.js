// //feedRoutes.js backend

const express = require('express');
const router = express.Router();
const Feed = require('../models/Feed');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const username = req.user.username;
        const createdAt = req.createdAt;
        const authToken = req.authToken;

        const newFeed = new Feed({
            username,
            content,
            createdAt,
        });

        await newFeed.save();

        res.status(201).json({ message: 'Feed update created successfully' });
    } catch (error) {
        console.error('Error creating feed update:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const Chatrooms = await Feed.find().sort({ createdAt: -1 });
        res.status(200).json(Chatrooms);
    } catch (error) {
        console.error('Error retrieving feed updates:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
