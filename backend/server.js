const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  // Import path module to resolve directory paths
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const fighterRoutes = require('./routes/fighterRoutes');
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Use routes
app.use('/api/fighters', fighterRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
