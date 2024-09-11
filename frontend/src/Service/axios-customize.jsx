import axios from 'axios'
import { SERVER_API } from '../config'

const instance = axios.create({
    baseURL: SERVER_API,
});

instance.interceptors.response.use(function (response) {
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });

export default instance;