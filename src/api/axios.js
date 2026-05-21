import axios from 'axios';

const api = axios.create({
  baseURL: 'https://streamingplatform-api.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true 
});

// Request Interceptor: Attach Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Global Error Handling (e.g., 401 Token Expiry)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem('auth_token');
      // Redirect to login (forces a reload to clear all React state safely)
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;