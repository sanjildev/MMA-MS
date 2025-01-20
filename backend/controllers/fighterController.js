const Fighter = require('../models/fighter');
const cloudinary = require('../config/cloudinaryConfig'); // Assuming cloudinaryConfig.js is already set up

// Get all fighters
const getFighters = async (req, res) => {
    try {
        const fighters = await Fighter.find();
        res.json(fighters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new fighter with a photo
const addFighter = async (req, res) => {
    try {
        // Create a new fighter object with the data from the request body
        const fighterData = req.body;

        // Check if a photo was uploaded
        if (req.file) {
            // Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            fighterData.photo = result.secure_url; // Store Cloudinary URL in the database
        }

        // Create a new fighter instance
        const newFighter = new Fighter(fighterData);
        await newFighter.save();
        res.status(201).json(newFighter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing fighter with a new photo (optional)
const updateFighter = async (req, res) => {
    try {
        // Create an object with the updated fighter data
        const updatedFighterData = req.body;

        // Check if a new photo was uploaded
        if (req.file) {
            // Upload the new image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
            updatedFighterData.photo = result.secure_url; // Update the photo field with the Cloudinary URL
        }

        // Update the fighter's information in the database
        const updatedFighter = await Fighter.findByIdAndUpdate(req.params.id, updatedFighterData, { new: true });
        res.json(updatedFighter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a fighter
const deleteFighter = async (req, res) => {
    try {
        await Fighter.findByIdAndDelete(req.params.id);
        res.json({ message: 'Fighter deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFighters, addFighter, updateFighter, deleteFighter };
