import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, Menu, Dropdown } from "antd";
import {
  AppstoreOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from '../../Configuration/AxiosConfig';
const { Search } = Input;
import { getRoles, getRedirectPath } from '../../Service/Login';

const SidebarHeader = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: #f8b600;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

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

const HeaderLeftContent = styled.div`
  display: flex;
  align-items: center;
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

const Header = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const fetchMyInfo = async () => {
      const response = await axios.get('/users/myInfo');
      setMyInfo(response.result);
    };
    fetchMyInfo();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    await axios.post('/auth/logout', { token });
    navigate('/');
  };

  const UserMenu = (
    <StyledMenu>
      <Menu.Item key="0" style={{ fontSize: "15px", fontWeight: "bold" }}>
        {myInfo?.username}
      </Menu.Item>
      <Menu.Item key="1" style={{ fontSize: "14px", color: "#c0bfbf" }}>
        {myInfo?.email}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" onClick={() => navigate("/staff/profile")}>
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="6" onClick={handleLogout}>
        <StyledLogoutOutlined />
        Đăng xuất
      </Menu.Item>
    </StyledMenu>
  );
  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <HeaderLeftContent>
            <SidebarHeader
              className="Allison"
              onClick={() => navigate(getRedirectPath(getRoles(localStorage.getItem('token'))))}
            >
              Healings
            </SidebarHeader>
          </HeaderLeftContent>
          <HeaderRightContent>
            <Dropdown
              overlay={UserMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <StyledImg src="/img/user.png" alt="user avatar" />
            </Dropdown>
          </HeaderRightContent>
        </HeaderContent>
      </HeaderContainer>
    </>
  );
};

export default Header;