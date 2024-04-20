const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors module
require('dotenv').config();

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors()); // Use cors middleware

const server = http.createServer(app);
const jwt = require("jsonwebtoken");
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const homeworkRoutes = require('./routes/homeworkRoutes');
const feedRoutes = require('./routes/feedRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const chatroomRoutes = require('./routes/chatroomRoutes'); 
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/message', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/feed', feedRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/chatrooms', chatroomRoutes); 


const PORT = process.env.PORT || 6554;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
