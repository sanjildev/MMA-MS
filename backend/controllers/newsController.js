const News = require('../models/News');
const cloudinary = require('../config/cloudinaryConfig'); // Import the cloudinary configuration

// Get all news
const getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new news article
const addNews = async (req, res) => {
    try {
        let photoUrl = null;
        
        // Upload to Cloudinary if there's a photo
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path); // Upload to Cloudinary
            photoUrl = result.secure_url; // Cloudinary provides a secure URL after upload
        }

        const newNews = new News({
            title: req.body.title,
            content: req.body.content,
            photo: photoUrl, // Store the Cloudinary URL in the database
        });

        await newNews.save();
        res.status(201).json(newNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a news article
const updateNews = async (req, res) => {
    try {
        let updatedPhotoUrl = req.body.photo; // If photo isn't being uploaded, keep existing URL

        // Upload a new photo if one is provided
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedPhotoUrl = result.secure_url; // Get the new Cloudinary URL
        }

        const updatedNews = await News.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, photo: updatedPhotoUrl }, 
            { new: true } // Return the updated document
        );

        res.json(updatedNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a news article
const deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'News deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNews, addNews, updateNews, deleteNews };
