const Chatroom = require('../models/Chatroom');
const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
  chatroomid: {
    ref: 'Chatroom',
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  username: {
    type: String,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
