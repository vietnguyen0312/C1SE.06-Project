import React from 'react';
import styled from 'styled-components';
import { Input, Menu, Dropdown } from 'antd';
import { AppstoreOutlined, BellOutlined, LogoutOutlined } from '@ant-design/icons';
const { Search } = Input;

const HeaderContainer = styled.div`
    width: 100%;
    height: 91px;
    background-color: #fff;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    height: 91px;
    justify-content: space-between;
`;

const StyledSearch = styled(Search)`
    width: 300px;
    margin-left: 20px;
`;

const HeaderRightContent = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
`;

const Flag = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

const StyledImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    cursor: pointer;
`;

const StyledMenu = styled(Menu)`
    border-radius: 8px;
    padding: 5px 0;
    min-width: 200px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-top: 10px;

    .ant-dropdown-menu-item {
        font-size: 14px;
        color: #333;
        padding: 10px 15px;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .ant-dropdown-menu-item:hover {
        background-color: #f5f5f5;
        color: #f8b600; 
    }

    .ant-dropdown-menu-item:first-child {
        font-weight: bold;
        color: #333;
        font-size: 15px;
    }

    .ant-dropdown-menu-divider {
        margin: 8px 0;
    }
`;
const StyledLogoutOutlined = styled(LogoutOutlined)`
    margin-right: 5px;
`;
const UserMenu = (
    <StyledMenu>
        <Menu.Item key="0" style={{fontSize: '15px',fontWeight: 'bold'}}>Name</Menu.Item>
        <Menu.Item key="1" style={{fontSize: '14px',color: '#c0bfbf'}}>email@gmail.com</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">Profile</Menu.Item>
        <Menu.Item key="3">Help</Menu.Item>
        <Menu.Item key="4">Message</Menu.Item>
        <Menu.Item key="5">Setting</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="6"><StyledLogoutOutlined />Logout</Menu.Item>
    </StyledMenu>
);

const Header = () => {
    return (
        <HeaderContainer>
            <HeaderContent>
                <StyledSearch placeholder="Search..." />
                <HeaderRightContent>
                    <Flag src="/img/vietnam.png" alt="Flag" style={{ margin: '10px' }} />
                    <AppstoreOutlined style={{ fontSize: '24px', margin: '10px' }} />
                    <BellOutlined style={{ fontSize: '24px', margin: '10px' }} />
                    <Dropdown overlay={UserMenu} trigger={['click']} placement="bottomRight">
                        <StyledImg src="/img/user.png" alt="user avatar" />
                    </Dropdown>
                </HeaderRightContent>
            </HeaderContent>
        </HeaderContainer>
    );
};

export default Header;
