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
    },
    type: {
        type: String,
        required: false,
    },
    items: []
}, { timestamps: true });



module.exports = mongoose.model('List', listSchema);