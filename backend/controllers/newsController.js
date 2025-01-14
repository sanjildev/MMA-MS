const News = require('../models/News');

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
        const newNews = new News({
            title: req.body.title,
            content: req.body.content,
            photo: req.file ? req.file.filename : null // Handle the uploaded photo if exists
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
        const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
