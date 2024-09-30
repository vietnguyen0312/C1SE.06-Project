import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ProfileContainer, ProfileRole } from '../Layout/PublicLayout/UserProfile/Style';
import {
    UserProfileContainer,
    UserProfileLeft,
    UserProfileRight,
    ProfileImage,
    ProfileInfo,
    SectionTitle
} from '../Layout/PublicLayout/UserProfile/Style';
import { EditOutlined, LockOutlined, LogoutOutlined } from '@mui/icons-material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ButtonCPN from '../components/Button/Button';
import axios from '../Configuration/AxiosConfig';
import { Link } from 'react-router-dom';


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
    const [userInfo, setUserInfo] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUserInfo, setEditedUserInfo] = useState({});
    const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await axios.get('/users/myInfo');
            setUserInfo(response.result);
            setEditedUserInfo(response.result);
            console.log(response.result);
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserInfo({ ...editedUserInfo, [name]: value });
        setIsConfirmEnabled(true);
    };

    const handleConfirmClick = async () => {
        const response = await axios.put(`/users/${userInfo.id}`, editedUserInfo);
        setUserInfo(response.result);
        setIsEditing(false);
        setIsConfirmEnabled(false);
        console.log(response);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setEditedUserInfo(userInfo);
        setIsConfirmEnabled(false);
    };

    const handleChangePassword = () => {
        setIsModalOpen(false);
    };

    const formatPhoneNumber = (phoneNumber) => {
        const maskedPart = phoneNumber.slice(-6).replace(/\d/g, '*');
        const visiblePart = phoneNumber.slice(0, -6);
        return `${visiblePart}${maskedPart}`;
    };

    const formatEmail = (email) => {
        if (!email) return '';
        const [name, domain] = email.split('@');
        const maskedName = name.slice(0, 2).padEnd(name.length, '*');
        return `${maskedName}@${domain}`;
    };

    const renderCustomerTypeBackground = (type, text, icon) => {
        switch (type) {
            case 'Đồng':
                return (
                    <>
                        <ProfileRole style={{ background: 'linear-gradient(to right, #CDB38B, #FFDEAD)', width: '100%' }}>
                            <EmojiEventsIcon style={{ color: '#8B4513', marginRight: '10px', backgroundColor: 'black', borderRadius: '50%', padding: '4px' }} />
                            <span style={{ marginRight: '10px', color: 'white' }}>{text}</span>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>{type}</span>
                        </ProfileRole>
                    </>
                );
            case 'Bạc':
                return (
                    <>
                        <ProfileRole style={{ background: 'linear-gradient(to right, #696969, #CFCFCF)', width: '100%' }}>
                            <EmojiEventsIcon style={{ color: '#888888', marginRight: '10px', backgroundColor: 'black', borderRadius: '50%', padding: '4px' }} />
                            <span style={{ marginRight: '10px', color: 'white' }}>{text}</span>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>{type}</span>
                        </ProfileRole>
                    </>
                );
            case 'Vàng':
                return (
                    <>
                        <ProfileRole style={{ background: 'linear-gradient(to right, #F9F400, #FFFAB3)', width: '100%' }}>
                            <EmojiEventsIcon style={{ color: '#FFFF00', marginRight: '10px', backgroundColor: 'black', borderRadius: '50%', padding: '4px' }} />
                            <span style={{ marginRight: '10px', color: 'Black' }}>{text}</span>
                            <span style={{ color: 'Black', fontWeight: 'bold' }}>{type}</span>
                        </ProfileRole>
                    </>
                );
            default:
                return null;
        }
    };
    return (
        <>
            <UserProfileContainer>
                <UserProfileLeft data-aos="fade-up" data-aos-delay="100">
                    <ProfileContainer>
                        <ProfileImage src={userInfo.avatar} data-aos="flip-left" />
                        <ProfileInfo>
                            <h2>{userInfo.username}</h2>
                            <Gender>
                                Giới tính:
                                {userInfo.gender === 'Female' ? (
                                    <FemaleIcon style={{ color: 'pink', marginLeft: '5px' }} />
                                ) : (
                                    <MaleIcon style={{ color: 'blue', marginLeft: '5px' }} />
                                )}
                            </Gender>
                        </ProfileInfo>
                    </ProfileContainer>
                    <Role>
                        <ProfileRole>
                            {userInfo && userInfo.customerType && renderCustomerTypeBackground(userInfo.customerType.name, 'Bạn là thành viên: ', <StarIcon style={{ color: '#c0c0c0' }} />)}
                        </ProfileRole>
                    </Role>
                    {userInfo.password !== null && (
                        <ProfileLink to="#" onClick={handleModalOpen}>
                            <ProfilePassWordIcon />
                            Đổi mật khẩu
                        </ProfileLink>
                    )}
                    <ProfileLink>
                        <LogoutOutlined />
                        Đăng xuất
                    </ProfileLink>
                </UserProfileLeft>

                <UserProfileRight data-aos="fade-up" data-aos-delay="200">
                    <ContactInfoContainer>
                        <SectionTitle>Thông tin liên hệ</SectionTitle>
                        <Label htmlFor="fullName">Tên đầy đủ</Label>
                        <InputField
                            id="fullName"
                            name="username"
                            type="text"
                            value={editedUserInfo.username || ''}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                        <Label htmlFor="email">Email</Label>
                        <InputField
                            id="email"
                            name="email"
                            type="email"
                            value={formatEmail(userInfo.email)}
                            readOnly
                            onChange={handleInputChange}
                        />
                        <Label htmlFor="phone">Số điện thoại</Label>
                        <InputField
                            id="phone"
                            name="phoneNumber"
                            type="text"
                            value={isEditing ? editedUserInfo.phoneNumber : formatPhoneNumber(userInfo.phoneNumber || '')}
                            readOnly={!isEditing}
                            onChange={handleInputChange}
                        />
                    </ContactInfoContainer>
                    <ButtonEdit>
                        {isEditing ? (
                            <>
                                <ButtonCPN text="Quay lại" onClick={handleCancelClick}>
                                    <EditOutlined />
                                </ButtonCPN>

                                <div style={{ marginLeft: '10px' }}></div>

                                <ButtonCPN text="Xác nhận" onClick={handleConfirmClick} disabled={!isConfirmEnabled}>
                                    <EditOutlined />
                                </ButtonCPN>
                            </>

                        ) : (
                            <ButtonCPN text="Chỉnh sửa" onClick={handleEditClick}>
                                <EditOutlined />
                            </ButtonCPN>
                        )}
                    </ButtonEdit>
                </UserProfileRight>

                {isModalOpen && (
                    <ModalOverlay onClick={handleModalClose}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>
                            <CloseButton onClick={handleModalClose}>×</CloseButton>
                            <ModalInput type="password" placeholder="Nhập mật khẩu hiện tại" />
                            <ModalInput type="password" placeholder="Nhập mật khẩu mới" />
                            <ModalInput type="password" placeholder="Nhập lại mật khẩu mới" />
                            <ButtonCPN text="Đổi mật khẩu" onClick={handleChangePassword}/>
                        </ModalContent>
                    </ModalOverlay>
                )}
            </UserProfileContainer>
        </>
    )
}

export default UserProfile;