import axios from './axios-customize';

export const refreshToken = async (token) => {
    return await axios.post('/auth/refresh', { token });
};