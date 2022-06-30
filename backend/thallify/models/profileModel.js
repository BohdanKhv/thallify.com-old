const mongoose = require('mongoose');



const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    spotifyId: {
        type: String,
        required: false
    },
    spotifyUrl: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    product: {
        type: String,
        required: false
    }
}, { timestamps: true });



module.exports = mongoose.model('Profile', profileSchema);