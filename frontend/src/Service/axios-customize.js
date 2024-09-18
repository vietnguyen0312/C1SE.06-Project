import axios from 'axios'
import { SERVER_API } from '../config'
import { toast } from 'react-toastify';
import { refreshToken } from './RefreshToken';

let instance = axios.create({
  baseURL: SERVER_API,
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

    if (!refreshTokenPromise) {

      const token = localStorage.getItem('token');
      localStorage.removeItem('token');

      refreshTokenPromise = refreshToken(token).then((response) => {
        localStorage.setItem('token', response.result.token);
        instance.defaults.headers.Authorization = `Bearer ${response.result.token}`;
      }).catch((error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');

        return Promise.reject(error);
      }).finally(() => {
        refreshTokenPromise = null;
      });
    }
    return refreshTokenPromise.then(() => {
      return instance(originalRequest);
    });
  }
  
  if (error.response?.status !== 401) {
    toast.error(error.response?.data?.message || error?.message);
  }

  return Promise.reject(error);
});

export default instance;