const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const chatroomSchema = new mongoose.Schema({
  chatroomid: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4, 
  },
  groupName: {
    type: String,
    required: true,
  },
  classValue: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
