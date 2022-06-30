import axios from "axios";

const API_URL = "/api/thallify/profiles/";

const getUserProfile = async (token) => {
    const serverRes = await axios.post(`${API_URL}spotify/`, {token});
    return serverRes.data;
}

const userService = {
    getUserProfile
}

export default userService;