// models/Grade.js

const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({

  username: {
    type: String,
    ref: 'User',
    required: true
  },
  classValue: {
    ref: 'User',
    type: String,
    required: true,
  },
  section: {
    ref: 'User',
    type: String,
    required: true,
  },
  rollNumber: {
    ref: 'User',
    type: Number,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  exam: {
    type: String,
    required: true,
  },
  marks: {
    type: String,
    required: true,
  }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
