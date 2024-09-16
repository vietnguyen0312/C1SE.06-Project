import React from 'react';
import { useState, useEffect } from 'react';
import axios from './axios-customize';
import { useNavigate } from 'react-router-dom';

const useAuthorization = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token !== null) {
                localStorage.removeItem('token');
                const response = await axios.post('/auth/introspect', { token });
                if (response.result.valid === true) {
                    localStorage.setItem('token', token);
                    getMyInfo();
                } else {
                    try {
                        const refreshToken = await axios.post('/auth/refresh', { token });
                        localStorage.setItem('token', refreshToken.result.token);
                        getMyInfo();
                    } catch (error) {
                        handleLogout();
                    }
                }
            }
        };
        fetchUser();
    }, []);

    const getMyInfo = async () => {
        const userInfo = await axios.get('/users/myInfo');
        setUser(userInfo.result);
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        try {
            localStorage.removeItem('token');
            await axios.post('/auth/logout', { token });
            setUser(null);
            console.log('Logout successful, navigating to home page');
            navigate('/');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return { user, handleLogout };
};

const Authorization = () => {
    const { user, handleLogout } = useAuthorization();

    return (
        <>
            {user ? (
                <li className="menu-has-children">
                    <li>{user.username}</li>
                    <ul>
                        <li><a href='/profile'>Thông tin cá nhân</a></li>
                        <li><a href='' onClick={handleLogout}>Đăng xuất</a></li>
                    </ul>
                </li>
            ) : (
                <li><a href="/authentication">Đăng nhập</a></li>
            )}
        </>
    );
};

export default Authorization;
