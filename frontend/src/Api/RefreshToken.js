import axios from 'axios';
import { API_URL } from '../Configuration/ClientConfig';

export const refreshToken = async (token) => {
    return (await axios.post(`${API_URL}/auth/refresh`, { token })).data;
};