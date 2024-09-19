import React from 'react';
import { useState, useEffect } from 'react';
import axios from './axios-customize';
import { useNavigate } from 'react-router-dom';

const useAuthorization = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const authCode = /code=([^&]+)/;
        const isMatch = window.location.href.match(authCode);

        const fetchUser = async () => {
            if (isMatch) {
                const code = isMatch[1];
                const response = await axios.post(`/auth/outbound/authentication?code=${code}`);
                localStorage.setItem('token', response.result.token);
            }
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get('/users/myInfo');
                setUser(response.result);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        await axios.post('/auth/logout', { token });
        setUser(null);
    };

    return { user, handleLogout };
};

const Authorization = () => {
    const { user, handleLogout } = useAuthorization();

    return (
        <>
            {user ? (
                <li className="menu-has-children">
                    <li><a href="/profile">{user.username}</a></li>
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
