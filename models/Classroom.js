// models/Classroom.js

const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (if teachers are stored as users)
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (if students are stored as users)
  }],
}, { timestamps: true });

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
