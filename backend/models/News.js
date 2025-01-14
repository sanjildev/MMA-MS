const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String }, // Optional field for image
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', newsSchema);
