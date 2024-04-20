//authMiidleware

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Check for token in headers
    const token = req.header('Authorization');

    // Check if token is missing
    if (!token) {
      return res.status(401).json({ message: 'Authorization denied. No token provided' });
    }

    const authToken = token.split(' ')[1];

    try {
      // Verify the token
      const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);

      // Check if the token has expired
      if (decodedToken.exp < Date.now() / 6554) {
        return res.status(401).json({ message: 'Authorization denied. Token has expired' });
      }

      // Fetch the user
      const user = await User.findById(decodedToken.userId);
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      // Set authToken and user in the request object
      req.authToken = authToken;
      req.user = user;

      next(); // Call next middleware or route handler
    } catch (error) {
      console.error('Error authenticating user:', error.message);
      return res.status(401).json({ message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
