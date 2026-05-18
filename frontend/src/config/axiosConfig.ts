import axios from 'axios';
import { getAuthToken } from 'src/auth/authToken';

const instance = axios.create({
  baseURL: window.location.port === '5173' || window.location.port === '3000'
    ? 'http://localhost:8081/api'  // dev local + docker
    : '/api'                        // Kubernetes (tout autre port)
});
instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;