import React from 'react';
import styled from 'styled-components';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 100px;
  margin-bottom: 100px;
`;
const FooterArea = styled.footer`
  background-color: #04091e;
  padding: 80px 0;
  color: #fff;
`;

const Title = styled.h6`
  color: #fff;
  margin-bottom: 25px;
`;

const Text = styled.p`
  color: #777777;
`;

const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Link = styled.a`
  color: #777777;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #333;
  padding-top: 20px;
  margin: 0 auto;
  max-width: 1140px;
`;

const FooterText = styled.p`
  color: #777777;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
`
const HomeIcon = styled(HomeOutlined)`
  margin-right: 10px;
  color: #f8b600;
`
const PhoneIcon = styled(PhoneOutlined)`
  margin-right: 10px;
  color: #f8b600;
`
const MailIcon = styled(MailOutlined)`
  margin-right: 10px;
  color: #f8b600;
`
const Footer = () => {
  return (
    <FooterArea>
      <Container>
        <Container1 style={{width: '35%'}}>
            <Title>Khu Du Lịch Sinh Thái</Title>
            <Text>
            Khu du lịch sinh thái mang đến trải nghiệm thiên nhiên thú vị, giúp du khách thư giãn, khám phá hệ sinh thái và hiểu thêm về bảo vệ môi trường.
            </Text>
        </Container1>
        <Container1 style={{width: '20%'}}>
            <Title>Liên kết</Title>
            <div style={{display: 'flex', gap: '50px'}}>
              <LinkList>
                <Link href="/">Trang chủ</Link>
                <Link href="/about">Giới thiệu</Link>
                <Link href="/services">Dịch vụ</Link>
                <Link href="/blogs">Tin tức</Link>
              </LinkList>
              <LinkList>
                <Link href="/hotels">Khách sạn</Link>
                <Link href="/booking">Đặt phòng</Link>
                <Link href="/ticket">Đặt vé</Link>
                <Link href="/contact">Liên hệ</Link>
              </LinkList>
            </div>
            
        </Container1>
        <Container1 style={{width: '35%'}}>
          <div>
            <Title>Liên hệ</Title>
            <div style={{display: 'flex',gap: '10px'}}>
              <div><HomeIcon/><i>Địa chỉ:</i></div><Text>Hoà Xuân, Hoà Vang, TP Đà Nẵng</Text>
            </div>
            <div style={{display: 'flex',gap: '10px'}}>
              <div><PhoneIcon/><i>Số điện thoại:</i></div><Text>(+84) 768778028</Text>
            </div>
            <div style={{display: 'flex',gap: '10px'}}>
              <div><MailIcon/><i>Email:</i></div><Text>vietnguyen0312@gmail.com</Text>
            </div>
          </div>
        </Container1>
      </Container>
      <FooterBottom>
          <FooterText>
          Healing mang đến trải nghiệm thư giãn tuyệt vời, giúp phục hồi tinh thần và mang lại sự hài lòng trọn vẹn cho mỗi du khách.<span role="img" aria-label="love">❤️</span>
          </FooterText>
        </FooterBottom>
    </FooterArea>
  );
};

export default Footer;