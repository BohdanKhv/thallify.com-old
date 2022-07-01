const List = require('../models/listModel');
const axios = require('axios');


const SPOTIFY_API_URL = "https://api.spotify.com/v1/me/";


// GET /api/thallify/lists/spotify/:id
// Public
const getUserLists = async (req, res) => {
    try {
        const lists = await List.find({ spotifyId: req.params.id });
        
        if (!lists) {
            return res.status(404).json({
                msg: 'Lists not found'
            });
        }

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}


// create list
const createListRequest = async (data) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${data.token}`,
            }
        };

        const response = await axios.get(`${SPOTIFY_API_URL}top/${data.type.toLowerCase()}?limit=50&offset=0&time_range=${data.timeRange}`, config);

        if (response.status !== 200) {
            console.error(err.message);
            return []
        } else {
            const list = new List({
                username: data.username,
                spotifyId: data.spotifyId,
                timeRange: data.timeRange,
                type: data.type,
                items: response.data.items
            });
            await list.save();
            return list;
        }
    } catch (err) {
        console.error(err.message);
        return []
    }
}


// POST /api/thallify/lists
// Public
const createList = async (req, res) => {
    try {
        const list = await List.findOne({ 
            spotifyId: req.body.spotifyId,
            timeRange: req.body.timeRange,
            type: req.body.type
        }).sort({ createdAt: -1 });

        if (list) {
            // if list has short_term time range, then check if was created in the last 2 weeks
            // if list has medium_term time range, then check if was created in the last 1 month
            // if list has long_term time range, then check if was created in the last 3 month
            // otherwise, create new list
            const now = new Date();
            const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
            const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            if (list.timeRange === 'short_term' && list.createdAt > twoWeeksAgo) {
                return res.status(200).json(list);
            } else if (list.timeRange === 'medium_term' && list.createdAt > oneMonthAgo) {
                return res.status(200).json(list);
            } else if (list.timeRange === 'long_term' && list.createdAt > threeMonthsAgo) {
                return res.status(200).json(list);
            } else {
                const newList = await createListRequest(req.body);
                return res.status(200).json(newList);
            }
        } else {
            const newList = await createListRequest(req.body);
            return res.status(200).json(newList);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}



module.exports = {
    getUserLists,
    createList
}