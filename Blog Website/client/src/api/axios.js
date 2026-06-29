import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
    // timeout: 10000,
    withCredentials: true,
})

export default api