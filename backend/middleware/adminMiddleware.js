const jwt = require('jsonwebtoken');
const User = require('../models/User'); // User model

// Middleware to check if user is an admin
const admin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Get the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await User.findOne({ _id: decoded._id }); // Find user by ID

    if (!user || user.role !== 'admin') {  // Check if the role is admin
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    req.user = user;  // Attach user to the request object
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed.' });
  }
};

module.exports = admin;
