// axios-setup.js
import axios from 'axios';
import store from './store';

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: baseURL,
});

api.interceptors.request.use((config) => {
  const token = store.state.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

