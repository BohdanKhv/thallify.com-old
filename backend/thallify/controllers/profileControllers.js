const axios = require('axios');
const Profile = require('../models/profileModel');


const SPOTIFY_API_URL = "https://api.spotify.com/v1/";


// GET /api/profiles/spotify/:id
// Public
const getProfileBySpotifyId = async (req, res) => {
    try {
        const profile = await Profile.findOne({ spotifyId: req.params.id});

        if (!profile) {
            return res.status(404).json({
                msg: 'Profile not found'
            });
        }

        return res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// POST /api/thallify/profiles/spotify/ accessToken required in body
// Public
const spotifyProfile = async (req, res) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${req.body.token}`,
            }
        };

        const spotRes = await axios.get(`${SPOTIFY_API_URL}me`, config);

        const profile = await Profile.findOne({ spotifyId: spotRes.data.id });

        if (!profile) {
            const newProfile = new Profile({
                name: spotRes.data.display_name,
                email: spotRes.data.email,
                spotifyId: spotRes.data.id,
                spotifyUrl: spotRes.data.external_urls.spotify,
                avatar: spotRes.data.images[0] ? spotRes.data.images[0].url : undefined,
                country: spotRes.data.country,
                type: spotRes.data.type,
                product: spotRes.data.product
            });

            const savedProfile = await newProfile.save();

            return res.status(201).json(savedProfile);
        }

        return res.status(200).json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


module.exports = {
    getProfileBySpotifyId,
    spotifyProfile
}