import axios from "axios";


const API_URL = "/api/thallify/lists/";


// POST /api/thallify/lists/
// @ Public
const createList = async (data) => {
    const serverRes = await axios.post(`${API_URL}`, data);
    return serverRes.data;
}


const listService = {
    createList
}

export default listService;