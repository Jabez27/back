const express = require('express');
const router = express.Router();
const Attend = require('../models/Attendance');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');



router.post('/', async (req, res) => {
  try {
    const { attendance } = req.body;

    for (const attendanceData of attendance) {
      const { rollNumber, username, classValue, section, attend, date } = attendanceData;

      const existingAttendance = await Attend.findOne({ rollNumber, username, classValue, section, date });
      if (existingAttendance) {
        return res.status(400).json({ message: 'Attendance already uploaded for this student and date' });
      }
      const newAttendance = new Attend({ rollNumber, username, classValue, section, attend, date });
      await newAttendance.save();
    }
    res.status(201).json({ message: 'Attendance uploaded successfully' });
  } catch (error) {
    console.error('Error uploading Attendance:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/me', authMiddleware, async (req, res) => {
  try {
    const { authToken } = req.headers; 
    const attend = await Attend.find({ authToken });

    if (attend.length === 0) {
      return res.status(404).json({ message: 'No attendance found for this user' });
    }

    res.status(200).json(attend);
  } catch (error) {
    console.error('Error fetching grades:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


router.get('/', async (req, res) => {
  try {
    const attend = await Grade.find();
    res.status(200).json(attend);
  } catch (error) {
    console.error('Error fetching Attandance:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/:rollNumber', async (req, res) => {
  try {
    const { rollNumber } = req.params;
    const attend = await Grade.find({ rollNumber });
    if (attend.length === 0) {
      return res.status(404).json({ message: 'No Attendance found for this student' });
    }
    res.status(200).json(attend);
  } catch (error) {
    console.error('Error fetching Attendance:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;



module.exports = router;
