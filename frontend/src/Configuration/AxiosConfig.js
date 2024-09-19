import axios from 'axios'
import { toast } from 'react-toastify';
import { refreshToken } from '../Api/RefreshToken';
import { API_URL } from './ClientConfig';

let instance = axios.create({
  baseURL: API_URL,
});

instance.defaults.timeout = 1000 * 60 * 10;

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


let refreshTokenPromise = null;

instance.interceptors.response.use((response) => {
  return response.data;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response?.status === 401 && originalRequest) {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    }

    if (!refreshTokenPromise) {
      const token = localStorage.getItem('token');
      localStorage.removeItem('token');

      refreshTokenPromise = refreshToken(token).then((response) => {
        localStorage.setItem('token', response.result.token);
        instance.defaults.headers.Authorization = `Bearer ${response.result.token}`;
      }).catch((error) => {
        localStorage.removeItem('token');
        window.location.reload();
        return Promise.reject(error);
      }).finally(() => {
        refreshTokenPromise = null;
      });
    }
    return refreshTokenPromise.then(() => {
      return instance(originalRequest);
    });
  }

  if (error.response?.status === 403) {
    window.location.href = '/403';
  }

  toast.error(error.response?.data?.message || error?.message);

  return Promise.reject(error);
});

export default instance;