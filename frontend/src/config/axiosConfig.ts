import axios from 'axios';
import { config } from './Constants';
import { getAuthToken } from 'src/auth/authToken';

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
});

instance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;


