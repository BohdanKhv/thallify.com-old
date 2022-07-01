import axios from "axios";


// for backend
// const API_URL = "/api/thallify/lists/";

// POST /api/thallify/lists/
// @ Public
// const createList = async (data) => {
//     const serverRes = await axios.post(`${API_URL}`, data);
//     return serverRes.data;
// }


const SPOTIFY_API_URL = "https://api.spotify.com/v1/me/";


// POST /api/thallify/lists/
// @ Public
const createList = async (data) => {
    const config = {
        headers: {
            Authorization: `Bearer ${data.token}`,
        }
    };
    const response = await axios.get(`${SPOTIFY_API_URL}top/${data.type.toLowerCase()}?limit=50&offset=0&time_range=${data.timeRange}`, config);
    const list = {
        username: data.username,
        spotifyId: data.spotifyId,
        timeRange: data.timeRange,
        type: data.type,
        items: response.data.items
    };
    return list;
}


const listService = {
    createList
}

export default listService;