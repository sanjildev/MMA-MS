const Fighter = require('../models/fighter');

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
            fighterData.photo = req.file.path; // Store the photo path in the database
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
            updatedFighterData.photo = req.file.path; // Store the new photo path in the database
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
