import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BannerSection3, ProfileContainer, ProfileRole } from './Style';
import {
    UserProfileContainer,
    UserProfileLeft,
    UserProfileRight,
    ProfileImage,
    ProfileInfo,
    SectionTitle
} from './Style'; 
import { EditOutlined, LockOutlined, LogoutOutlined } from '@mui/icons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import DiamondIcon from '@mui/icons-material/Diamond';
import StarIcon from '@mui/icons-material/Star';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ButtonCPN from '../../../components/Button/Button';
import { Link } from 'react-router-dom';


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(4, 9, 30, 0.4);
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const ProfileLink = styled(Link)`
  margin-top: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: black;
  text-decoration: none;
  &:hover {
    color: #f8b600;
  }
`;

const ContactInfoContainer = styled.div`
  margin-top: 10px;
  padding: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #7b7b7b;
  margin-bottom: 5px;
  display: block;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ProfilePassWordIcon = styled(LockOutlined)`
  font-size: 20px;
`;

const ButtonEdit = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 20px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Gender = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Role = styled.div`
  border-bottom: 1px solid silver;
`;

const UserProfile = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    image: '/img/User/u1.jpg',
    type: 'silver', // có thể là 'bronze', 'silver', 'gold', 'diamond'
    phone: '0987654321',
    address: '1234 Main St, Anytown, USA',
    gender: 'male',
    dateOfBirth: '1990-01-01',
    nation: 'Việt Nam',
  };



  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const formatPhoneNumber = (phoneNumber) => {
    const maskedPart = phoneNumber.slice(-6).replace(/\d/g, '*');
    const visiblePart = phoneNumber.slice(0, -6);
    return `${visiblePart}${maskedPart}`;
  };
  
  const formatEmail = (email) => {
    const [name, domain] = email.split('@');
    const maskedName = name.slice(0, 2).padEnd(name.length, '*');
    return `${maskedName}@${domain}`;
  };

  const renderCustomerTypeBackground = (type, text, icon) => {
    switch (type) {
      case 'bronze':
        return (
          <>
            <ProfileRole style={{ background:'linear-gradient(to right, #CDB38B, #FFDEAD)', width: '100%' }}>
            <EmojiEventsIcon style={{ color: '#8B4513', marginRight: '10px',backgroundColor:'black',borderRadius:'50%',padding:'4px' }} />
              <span style={{ marginRight: '10px',color:'white' }}>{text}</span>
              <span style={{ color: 'white',fontWeight:'bold' }}>{type}</span>
            </ProfileRole>
          </>
        );
      case 'silver':
        return (
          <>
            <ProfileRole style={{ background:'linear-gradient(to right, #696969, #CFCFCF)', width: '100%' }}>
            <EmojiEventsIcon style={{ color: '#888888', marginRight: '10px',backgroundColor:'black',borderRadius:'50%',padding:'4px' }} />
              <span style={{ marginRight: '10px',color:'white' }}>{text}</span>
              <span style={{ color: 'white',fontWeight:'bold' }}>{type}</span>
            </ProfileRole>
          </>
        );
      case 'gold':
        return (
          <>
            <ProfileRole style={{  background: 'linear-gradient(to right, #F9F400, #FFFAB3)', width: '100%' }}>
              <EmojiEventsIcon style={{ color: '#FFFF00', marginRight: '10px',backgroundColor:'black',borderRadius:'50%',padding:'4px' }} />
              <span style={{ marginRight: '10px',color:'Black' }}>{text}</span>
              <span style={{ color: 'Black',fontWeight:'bold' }}>{type}</span>
            </ProfileRole>
          </>
        );
      case 'diamond':
        return (
          <>
            <ProfileRole style={{ background: 'linear-gradient(to right, #028174, #b9fbc0)', width: '100%' }}>
            <EmojiEventsIcon style={{ color: '#00FFFF', marginRight: '10px',backgroundColor:'black',borderRadius:'50%',padding:'4px' }} />
              <span style={{ marginRight: '10px',color:'white' }}>{text}</span>
              <span style={{ color: 'white',fontWeight:'bold' }}>{type}</span>
            </ProfileRole>
          </>
        );
      default:
        return null;
    }
  };
  

  

  return (
    <div style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none' }}>
      <BannerSection3>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title data-aos="fade-left" >Thông tin cá nhân</Title>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection3>

      <UserProfileContainer>
        <UserProfileLeft data-aos="fade-up" data-aos-delay="100">
          <ProfileContainer>
            <ProfileImage src={userInfo.image} alt={userInfo.name} data-aos="flip-left"/>
            <ProfileInfo>
              <h2>{userInfo.name}</h2>
              <Gender>
                Giới tính: 
                {userInfo.gender === 'male' ? (
                  <MaleIcon style={{ color: 'blue', marginLeft: '5px' }} />
                ) : (
                  <FemaleIcon style={{ color: 'pink', marginLeft: '5px' }} />
                )}
              </Gender>
            </ProfileInfo>
          </ProfileContainer>
          <Role>
            <ProfileRole>
              {renderCustomerTypeBackground(userInfo.type,'Bạn là thành viên: ',<StarIcon style={{ color: '#c0c0c0' }} /> )}
            </ProfileRole>
          </Role>
          <ProfileLink to="#" onClick={handleModalOpen}>
            <ProfilePassWordIcon />
            Đổi mật khẩu
          </ProfileLink>
          <ProfileLink>
            <LogoutOutlined />
            Đăng xuất
          </ProfileLink>
        </UserProfileLeft>

        <UserProfileRight data-aos="fade-up" data-aos-delay="200">
          <ContactInfoContainer>
            <SectionTitle>Thông tin liên hệ</SectionTitle>
            <Label htmlFor="fullName">Tên đầy đủ</Label>
            <InputField id="fullName" type="text" value={userInfo.name} readOnly />
            <Label htmlFor="email">Email</Label>
            <InputField id="email" type="email" value={formatEmail(userInfo.email)} readOnly />
            <Label htmlFor="phone">Số điện thoại</Label>
            <InputField id="phone" type="text" value={formatPhoneNumber(userInfo.phone)} readOnly />
            <Label htmlFor="address">Địa chỉ</Label>
            <InputField id="address" type="text" value={userInfo.address} readOnly />
          </ContactInfoContainer>
          <ButtonEdit>
            <ButtonCPN text="Chỉnh sửa">
              <EditOutlined />
            </ButtonCPN>
          </ButtonEdit>
        </UserProfileRight>

        {isModalOpen && (
          <ModalOverlay onClick={handleModalClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={handleModalClose}>×</CloseButton>
              <ModalInput type="password" placeholder="Nhập mật khẩu hiện tại" />
              <ModalInput type="password" placeholder="Nhập mật khẩu mới" />
              <ModalInput type="password" placeholder="Nhập lại mật khẩu mới" />
              <ButtonCPN text="Đổi mật khẩu" />
            </ModalContent>
          </ModalOverlay>
        )}
      </UserProfileContainer>
    </div>
  );
};

export default UserProfile;
