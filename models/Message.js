const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatroomid: {
    ref: 'Chatroom',
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    ref: 'User',
    required: true,
  },
  image: { 
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
