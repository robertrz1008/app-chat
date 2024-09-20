import axios from "axios"
import { API_URL } from "../utils/config";

const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
});

export default instance