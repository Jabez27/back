const express = require('express');
const router = express.Router();
const Homework = require('../models/Homework');
const authMiddleware = require('../middleware/authMiddleware');

// Create a homework assignment
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { classValue, section, subject, title, description, dueDate } = req.body;
        const createdBy = req.user._id;

        const newHomework = new Homework({
            classValue,
            section,
            subject,
            title,
            description,
            dueDate,
            createdBy,
        });

        await newHomework.save();

        res.status(201).json({ message: 'Homework assignment created successfully' });
    } catch (error) {
        console.error('Error creating homework assignment:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
      const { classValue, section, subject, date } = req.query;
      let filter = {};
  
      // Apply filters if provided
      if (classValue) filter.classValue = classValue;
      if (section) filter.section = section;
      if (subject) filter.subject = subject;
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(new Date(date).setDate(startDate.getDate() + 1)); // Next day
        filter.createdAt = { $gte: startDate, $lt: endDate };
      }
  
      const homeworkAssignments = await Homework.find(filter).sort({ createdAt: -1 });
      res.status(200).json(homeworkAssignments);
    } catch (error) {
      console.error('Error retrieving homework assignments:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
module.exports = router;
    