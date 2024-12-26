import React, { Component } from 'react';
import styled from 'styled-components';
import { DashboardContainer, Header, HeaderItem, DateStyle } from './Dashboard';
import { RetweetOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import ButtonCpn from '../../components/Button/Button';

const ProfileContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
`;
const ProfileBody = styled.div`
    display: flex;
    gap: 20px;
`;
const ProfileLeft = styled.div`
    width: 30%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    height: 50%;
`;
const ProfileRight = styled.div`
    width: 70%;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
`;
const IMG = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;
const ProfileInfomation = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    gap: 10px;
    padding-bottom: 30px;
    border-bottom: 2px solid #f8b600;
`;
const Name = styled.div`
    font-size: 20px;
    font-weight: 600;
`;
const ProfileInfomation2 = styled.div`
    font-size: 15px;
    padding-top: 30px;
    color: #777;
`;
const ItemDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;
`;
const HeaderItemDetail = styled.div`
    font-size: 15px;
    font-weight: 600;
    background-color: #e9e9e9;
    padding: 14px;
    border-radius: 5px;
`;
const ContentItem = styled.div`
    font-size: 15px;
    color: #777;
    padding: 14px;
    border-radius: 5px;
`;
const Social = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;
const maskInfo = (info, visibleCount) => {
    return '*'.repeat(info.length - visibleCount) + info.slice(-visibleCount);
};

class Profile extends Component {
    render() {
        return (
            <ProfileContainer>
                <DashboardContainer>
                    <div>
                        <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Thông tin cá nhân</div>
                    </div>
                </DashboardContainer>
                <ProfileBody>
                    <ProfileLeft>
                        <ProfileInfomation>
                            <IMG src="/img/user.png" alt="user avatar" />
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <Name>Name</Name>
                                <div>email@gmail.com</div>
                            </div>
                            <ButtonCpn text='Edit Profile' style={{ width: '150px', height: '33px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                        </ProfileInfomation>
                        <ProfileInfomation2 style={{ fontSize: '15px', color: '#777' }}>
                            I am a team leader of Luxurious technology. I have a 6+ years of experience. I have experience using PHP, HTML, CSS, JavaScript/jQuery, MySQL and associated frameworks to build specialized webpages.
                        </ProfileInfomation2>
                    </ProfileLeft>
                    <ProfileRight>
                        <DashboardContainer>
                            <div>
                                <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '10px' }}>Account Details</div>
                                <Header>
                                    <HeaderItem>From your account you can easily view and track orders. You can manage and change your account information like address, contact information and history of orders.</HeaderItem>
                                </Header>
                            </div>
                        </DashboardContainer>
                        <ItemDetail>
                            <div style={{display:'flex', gap: '20px',width:'100%'}}>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>E-mail address</HeaderItemDetail>
                                    <ContentItem>
                                        <div>Email 1 : support1@exapmle.com</div>
                                        <div>Email 2 : support2@exapmle.com</div>
                                    </ContentItem>
                                </div>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Contact number</HeaderItemDetail>
                                    <ContentItem>
                                        <div>Phone 1 : 0909090909</div>
                                        <div>Phone 2 : 0909090909</div>
                                    </ContentItem>
                                </div>
                            </div>
                            <div style={{display:'flex', gap: '20px',width:'100%'}}>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Address</HeaderItemDetail>
                                    <ContentItem>
                                        <div>Address 1 : 123456, Street, City, Country</div>
                                    </ContentItem>
                                </div>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Address 2</HeaderItemDetail>
                                    <ContentItem>
                                        <div>Address 1 : 123456, Street, City, Country</div>
                                    </ContentItem>
                                </div>
                            </div>
                            <div style={{display:'flex', gap: '20px',width:'100%'}}>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Bank account</HeaderItemDetail>
                                    <ContentItem>
                                        <div>Account Name : Wiley Waites</div>
                                        <div>Account Number : {maskInfo('1234567890123456780', 2)}</div>
                                        <div>IFSC Code : {maskInfo('IFSC0001234', 4)}</div>
                                        <div>Bank Name : Barky Central Bank</div>
                                    </ContentItem>
                                </div>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Social media</HeaderItemDetail>
                                    <ContentItem>
                                        <Social><FacebookOutlined /> Facebook</Social>
                                        <Social><TwitterOutlined /> Twitter </Social>
                                        <Social><InstagramOutlined /> Instagram </Social>
                                    </ContentItem>
                                </div>
                            </div>
                            <div style={{display:'flex', gap: '20px',width:'100%'}}>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Payment</HeaderItemDetail>
                                    <ContentItem>
                                        <div>Card Number : {maskInfo('1234567890123456', 4)}</div>
                                        <div>Card Type : Master Card</div>
                                        <div>Expiry Date : 12/24</div>
                                    </ContentItem>
                                </div>
                                <div style={{width:'50%'}}>
                                    <HeaderItemDetail>Tax Info</HeaderItemDetail>
                                    <ContentItem>
                                        <div>TIN NO : {maskInfo('SDF5123456789F', 3)}</div>
                                        <div>Tax ID Number : {maskInfo('6582123456789523', 4)}</div>
                                    </ContentItem>
                                </div>
                            </div>
                        </ItemDetail>
                    </ProfileRight>
                </ProfileBody>
            </ProfileContainer>
        );
    }
}

export default Profile;