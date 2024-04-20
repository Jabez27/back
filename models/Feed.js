//Feed model

const mongoose = require("mongoose");

const feedSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Feed = mongoose.model("Feed", feedSchema);

module.exports = Feed;
