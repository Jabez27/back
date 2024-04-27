// models/Grade.js

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

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
  date: {
    type: String,
    required: true,
  },
  attend: {
    type: String,
    required: true,
  }
});

const Attend = mongoose.model('Attend', attendanceSchema);

module.exports = Attend;
