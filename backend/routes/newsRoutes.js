const express = require('express');
const multer = require('multer'); // Import multer for file uploads
const { getNews, addNews, updateNews, deleteNews } = require('../controllers/newsController');
const protect = require('../middleware/authMiddleware'); // Import protect middleware
const router = express.Router();

// Configure multer for uploading images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save uploaded files to the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
    },
});

const upload = multer({ storage: storage });

// Get all news articles (public route)
router.get('/', getNews);

// Add a new news article (protected route, requires authentication)
router.post('/', protect, upload.single('photo'), addNews);

// Update a news article (protected route, requires authentication)
router.put('/:id', protect, upload.single('photo'), updateNews);

// Delete a news article (protected route, requires authentication)
router.delete('/:id', protect, deleteNews);

module.exports = router;
