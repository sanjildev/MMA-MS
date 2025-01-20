const express = require('express');
const multer = require('multer'); // Multer for handling file uploads
const { getFighters, addFighter, updateFighter, deleteFighter } = require('../controllers/fighterController');
const protect = require('../middleware/authMiddleware'); // Middleware for authentication
const cloudinary = require('../config/cloudinaryConfig'); // Cloudinary configuration
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Cloudinary storage integration
const router = express.Router();

// Configure multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fighters', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed file formats
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Custom public ID
  },
});

const upload = multer({ storage: storage });

// Get all fighters (public route, no need for authentication)
router.get('/', getFighters);

// Add a new fighter (protected route, requires authentication)
router.post('/', protect, upload.single('photo'), addFighter);

// Update an existing fighter (protected route, requires authentication)
router.put('/:id', protect, upload.single('photo'), updateFighter);

// Delete a fighter (protected route, requires authentication)
router.delete('/:id', protect, deleteFighter);

module.exports = router;
