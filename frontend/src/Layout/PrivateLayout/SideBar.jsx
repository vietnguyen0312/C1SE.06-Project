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

const SidebarContainer = styled.div`
    width: 250px;
    height: 100vh;
    border-right: 1px solid #e5e5e5;
`;

const SidebarHeader = styled.div`
    font-size: 60px;
    font-weight: 600;
    color: #f8b600;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    align-items: center;
    justify-content: center;
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

    const menuItems = (
        <>
            <div><a href="#option1">Option 1</a></div>
            <div><a href="#option2">Option 2</a></div>
            <div style={{ color: 'gray' }}>Disabled Option</div>
        </>
    );

    const dashboard = (
        <>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}} href='/dashboard'><FileTextOutlined />Report</div>
        </>
    );

    return (
        <SidebarContainer>
            <SidebarHeader className='Allison'>Healings</SidebarHeader>
            <SidebarContent>
                <DropdownMenu
                    icon={<DashboardOutlined />}
                    label="Dashboard"
                    content={dashboard}
                    isActive={activeDropdown === 'dashboard'}
                    onClick={() => toggleDropdown('dashboard')}
                    icon2={<RightOutlined />}
                />
                <DropdownMenu
                    icon={<TeamOutlined />}
                    label="Staff"
                    content={menuItems}
                    isActive={activeDropdown === 'staff'}
                    onClick={() => toggleDropdown('staff')}
                    icon2={<RightOutlined />}
                />
                <DropdownMenu
                    icon={<KeyOutlined />}
                    label="Authentication"
                    content={menuItems}
                    isActive={activeDropdown === 'authentication'}
                    onClick={() => toggleDropdown('authentication')}
                    icon2={<RightOutlined />}
                />
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
                    <Item>
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
