import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { 
    DashboardOutlined, 
    FileTextOutlined, 
    UserOutlined, 
    TeamOutlined, 
    KeyOutlined, 
    ProfileOutlined, 
    HomeOutlined, 
    CalendarOutlined, 
    FileDoneOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const SidebarContainer = styled.div`
    width: 250px;
    height: 100vh;
    border-right: 1px solid #e5e5e5;
`;

const SidebarContent = styled.div`
    height: 100%;
    padding: 0 20px;
`;

const Hotel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    border-bottom: 1px solid #e5e5e5;
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        color: #f8b600;
    }
`;

const Content = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #f8b600;
    padding: 0 10px;
`;

const Sidebar = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    };
    const navigate = useNavigate(); // Khởi tạo useNavigate

    return (
        <SidebarContainer>
            <SidebarContent>
                <div style={{ padding: '15px 0', borderBottom: '1px solid #e5e5e5' }} onClick={() => navigate('/manager')}>
                    <Item>
                        <DashboardOutlined />
                        <div>Dashboard</div>
                    </Item>
                </div>
                <Hotel>
                    <Content>HOTEL | ROOM</Content>
                    <Item>
                        <UserOutlined />
                        <div>Guest</div>
                    </Item>
                    <Item>
                        <ProfileOutlined />
                        <div>Guest Details</div>
                    </Item>
                    <Item onClick={() => navigate('/manager/rooms')}>
                        <HomeOutlined />
                        <div>Rooms</div>
                    </Item>
                    <Item onClick={() => navigate('/manager/bookings')}>
                        <CalendarOutlined />
                        <div>Bookings</div>
                    </Item>
                    <Item>
                        <FileDoneOutlined />
                        <Link style={{textDecoration: "none", color: "inherit"}} to='/manager/blogs'>Blogs</Link>
                    </Item>
                    <Item>
                        <FileDoneOutlined />
                        <div>Invoice</div>
                    </Item>
                </Hotel>
                <Hotel>
                    <Content>USERS</Content>
                    <Item onClick={() => navigate('/manager/employee')}>
                        <TeamOutlined />
                        <div>Employee</div>
                    </Item>
                    <Item onClick={() => navigate('/manager/customer')}>
                        <TeamOutlined />
                        <div>Customer</div>
                    </Item>
                    <Item onClick={() => navigate('/manager/listManager')}>
                        <TeamOutlined />
                        <div>Manager</div>
                    </Item>
                </Hotel>
                <Hotel>
                    <Content>SERVICE</Content>
                    <Item onClick={() => navigate('/manager/service')}>
                        <KeyOutlined />
                        <div>Service</div>
                    </Item>
                </Hotel>
            </SidebarContent>
        </SidebarContainer>
    );
};

export default Sidebar;
