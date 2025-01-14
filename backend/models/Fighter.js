const mongoose = require('mongoose');

const fighterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    weight: { type: String, required: true },
    record: { type: String, required: true },
    bio: { type: String },
    photo: { type: String }
});

module.exports = mongoose.model('Fighter', fighterSchema);
