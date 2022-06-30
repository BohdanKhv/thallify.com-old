const mongoose = require('mongoose');



const listSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false
    },
    spotifyId: {
        type: String,
        required: false
    },
    timeRange: {
        type: String,
        required: false,
        enum: ['short_term', 'medium_term', 'long_term']
    },
    limit: {
        type: Number,
        required: false
    },
    type: {
        type: String,
        required: false,
        enum: ['tracks', 'artists']
    },
    items: []
}, { timestamps: true });



module.exports = mongoose.model('List', listSchema);