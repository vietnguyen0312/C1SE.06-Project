import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../Configuration/AxiosConfig';

const GetUserInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
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

const UserInfo = () => {
    const { user, handleLogout } = GetUserInfo();

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

export default UserInfo;
