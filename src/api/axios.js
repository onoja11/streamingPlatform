import axios from 'axios';

const api = axios.create({
    baseURL: 'https://streamingplatform-api.onrender.com/api', // Your Laravel URL
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true 
});

// --- ADD THIS INTERCEPTOR ---
// This code runs before every request. It checks if there is a token 
// and adds the "Authorization: Bearer ..." header.
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;