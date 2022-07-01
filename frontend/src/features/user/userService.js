import axios from "axios";

// for backend
// const API_URL = "/api/thallify/profiles/";

// const getUserProfile = async (token) => {
//     const serverRes = await axios.post(`${API_URL}spotify/`, {token});
//     return serverRes.data;
// }

const SPOTIFY_API_URL = "https://api.spotify.com/v1/";

const getUserProfile = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };
    const res = await axios.get(`${SPOTIFY_API_URL}me`, config);

    const profile = {
        name: res.data.display_name,
        email: res.data.email,
        spotifyId: res.data.id,
        spotifyUrl: res.data.external_urls.spotify,
        avatar: res.data.images[0] ? res.data.images[0].url : undefined,
        country: res.data.country,
        type: res.data.type,
        product: res.data.product
    }
    return profile;
}

const userService = {
    getUserProfile
}

export default userService;