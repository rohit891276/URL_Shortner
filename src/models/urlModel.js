const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true,
        trim: true
    },
    shortUrl: {
        type: String
    },
    urlId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);