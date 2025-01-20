const express = require('express');
const multer = require('multer'); // Multer for handling file uploads
const { getNews, addNews, updateNews, deleteNews } = require('../controllers/newsController');
const protect = require('../middleware/authMiddleware'); // Middleware for authentication
const cloudinary = require('../config/cloudinaryConfig'); // Cloudinary configuration
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Cloudinary storage integration
const router = express.Router();

// Configure multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'news', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Custom public ID
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
