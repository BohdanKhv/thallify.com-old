const express = require('express');
const router = express.Router();
const {
    getProfileBySpotifyId,
    spotifyProfile,
} = require('../controllers/profileControllers');


router
    .get('/spotify/:id', getProfileBySpotifyId)
    .post('/spotify/', spotifyProfile);


module.exports = router;