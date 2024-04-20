const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// Route: POST /api/users
// Description: Create a new user profile
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role, classValue, section, rollNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user profile
    const newUser = new User({
      username,
      email,
      password,
      role,
      classValue,
      section,
      rollNumber
    });
    // Save the user profile to the database
    await newUser.save();

    res.status(201).json({ message: 'User profile created successfully' });
  } catch (error) {
    console.error('Error creating user profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Retrieve user information from request object (attached by auth middleware)
    const userId = req.user._id; // Use authenticated user's ID
    const user = await User.findById(userId).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user profile
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: GET /api/users
// Description: Retrieve all user profiles
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '-password -email -role'); // Exclude password, email, and role from the response
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving user profiles:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route: GET /api/users/:userId
// Description: Retrieve user profile by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route: PUT /api/users/:userId
// Description: Update user profile by userId
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, role, classValue, section, rollNumber } = req.body;

    // Find user profile by userId and update
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password, role, classValue, section, rollNumber }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
