const express = require('express');
const multer = require('multer'); // Import multer for file uploads
const { getFighters, addFighter, updateFighter, deleteFighter } = require('../controllers/fighterController');
const protect = require('../middleware/authMiddleware'); // Import protect middleware
const router = express.Router();

// Configure multer storage (where to store the uploaded files)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the folder to save the files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
    },
});

// Create the multer instance for file uploads
const upload = multer({ storage: storage });

// Get all fighters (public route, no need for authentication)
router.get('/', getFighters);

// Add a new fighter (protected route, requires authentication)
router.post('/', protect, upload.single('photo'), addFighter); // use multer to handle photo upload

// Update an existing fighter (protected route, requires authentication)
router.put('/:id', protect, upload.single('photo'), updateFighter); // use multer to handle photo upload

// Delete a fighter (protected route, requires authentication)
router.delete('/:id', protect, deleteFighter);

module.exports = router;
