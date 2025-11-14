// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:3000/api", // ⚠️ đổi lại nếu bạn dùng IP LAN, ví dụ http://192.168.1.87:3000/api
    headers: {
        "Content-Type": "application/json",
    },
});

// Nếu cần token:
axiosClient.interceptors.request.use(async (config) => {
    const token = null; // ví dụ: lấy từ AsyncStorage nếu có
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosClient;
