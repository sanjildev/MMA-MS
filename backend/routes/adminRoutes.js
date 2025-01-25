const express = require('express');
const { addNews, updateNews, deleteNews } = require('../controllers/newsController');
const protect = require('../middleware/authMiddleware');  // Authentication middleware
const admin = require('../middleware/adminMiddleware');  // Admin check middleware
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// Configure multer for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'news',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    public_id: (req, file) => Date.now() + '-' + file.originalname,
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB file size limit

// Admin routes (only admins can access these)
router.post('/', protect, admin, upload.single('photo'), addNews);  // Only admin can add news
router.put('/:id', protect, admin, upload.single('photo'), updateNews);  // Only admin can update news
router.delete('/:id', protect, admin, deleteNews);  // Only admin can delete news

module.exports = router;
