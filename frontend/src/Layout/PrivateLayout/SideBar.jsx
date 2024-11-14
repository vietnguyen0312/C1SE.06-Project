import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    DashboardOutlined, 
    RightOutlined, 
    FileTextOutlined, 
    UserOutlined, 
    TeamOutlined, 
    KeyOutlined, 
    ProfileOutlined, 
    HomeOutlined, 
    CalendarOutlined, 
    FileDoneOutlined 
} from '@ant-design/icons';
import DropdownMenu from '../../components/Dropdown/dropdown';  
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

    const menuItems = (
        <>
            <div><a href="#option1">Option 1</a></div>
            <div><a href="#option2">Option 2</a></div>
            <div style={{ color: 'gray' }}>Disabled Option</div>
        </>
    );

    const dashboard = (
        <>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}} onClick={() => navigate('/manager')}><FileTextOutlined />Report</div>
        </>
    );

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
                    <Item>
                        <HomeOutlined />
                        <div>Rooms</div>
                    </Item>
                    <Item onClick={() => navigate('/manager/bookings')}>
                        <CalendarOutlined />
                        <div>Bookings</div>
                    </Item>
                    <Item>
                        <FileDoneOutlined />
                        <div>Invoice</div>
                    </Item>
                </Hotel>
            </SidebarContent>
        </SidebarContainer>
    );
};

export default Sidebar;
