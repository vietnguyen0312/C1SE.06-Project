import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../Configuration/AxiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Thêm dòng này để tích hợp Bootstrap JS
import { NavMenuLink, NavMenuItem } from '../Layout/PublicLayout/Header/style';

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
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [showSubmenu, setShowSubmenu] = useState(false);

    return (
        <>
            {user ? (
                <NavMenuItem className="nav-item dropdown" onMouseEnter={() => setActiveDropdown('service')} onMouseLeave={() => setActiveDropdown(null)}>
                    <NavMenuLink href="/customer/userProfile" className="nav-link dropdown-toggle" id="blogDropdown" role="button" aria-expanded={activeDropdown === 'service'}>
                        {user.username}
                    </NavMenuLink>
                    <ul className={`dropdown-menu ${activeDropdown === 'service' ? 'show' : ''}`} aria-labelledby="blogDropdown">
                        <li>
                            <NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="/customer/userProfile">
                                Thông tin cá nhân
                            </NavMenuLink>
                        </li>
                        <li>
                            <NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="/customer/historyTicketBill">
                                Lịch sử giao dịch
                            </NavMenuLink>
                        </li>
                        <li>
                            <NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="" onClick={handleLogout}>
                                Đăng xuất
                            </NavMenuLink>
                        </li>
                    </ul>
                </NavMenuItem>
            ) : (
                <NavMenuItem><NavMenuLink href="/authentication">Đăng nhập</NavMenuLink></NavMenuItem>
            )}
        </>
    );
};

export default UserInfo;
