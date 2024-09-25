import axios from '../Configuration/AxiosConfig';

export const getRoles = (token) => {
    let jwtData = token.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    let roles = decodedJwtData.scope.split(' ');
    return roles;
};

export const getRedirectPath = (roles) => {
    if (roles.includes('MANAGER'))
        return '/manager';
    else if (roles.includes('EMPLOYER'))
        return '/employer';
    else if (roles.includes('EMPLOYEE'))
        return '/employee';
    return '/';
};

export const login = async (email, password) => {
    const response = await axios.post('/auth/token', { email, password });
    const token = response.result.token;
    localStorage.setItem('token', token);
    const roles = getRoles(token);
    const redirectPath = getRedirectPath(roles);
    return redirectPath;
};
