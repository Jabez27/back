// routes/gradeRoutes.js

const express = require('express');
const router = express.Router();
const Grade = require('../models/Grade');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');



// Route: POST /api/grades
// Description: Upload marks for students
router.post('/', async (req, res) => {
  try {
    const { grades } = req.body;

    for (const grade of grades) {
      const { rollNumber, username, classValue, section, subject, exam, marks } = grade;

      const existingGrade = await Grade.findOne({ rollNumber, username, classValue, section, subject, exam });
      if (existingGrade) {
        return res.status(400).json({ message: 'Marks already uploaded for this student, exam, and subject' });
      }

      const newGrade = new Grade({ rollNumber, username, classValue, section, subject, exam, marks });

      await newGrade.save();
    }

    res.status(201).json({ message: 'Marks uploaded successfully' });
  } catch (error) {
    console.error('Error uploading marks:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/me', authMiddleware, async (req, res) => {
  try {
    const { authToken } = req.headers; 
    const grades = await Grade.find({ authToken });

    if (grades.length === 0) {
      return res.status(404).json({ message: 'No grades found for this user' });
    }

    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


router.get('/', async (req, res) => {
  try {
    const grades = await Grade.find();
    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const grades = await Grade.find({ rollNumber });
    if (grades.length === 0) {
      return res.status(404).json({ message: 'No grades found for this student' });
    }
    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching grades:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;



module.exports = router;
