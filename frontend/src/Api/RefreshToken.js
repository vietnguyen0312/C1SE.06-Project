import axios from '../Configuration/AxiosConfig';

export const refreshToken = async (token) => {
    return await axios.post('/auth/refresh', { token });
};