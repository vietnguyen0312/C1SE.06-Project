import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceList from '../../Service/ServiceList.jsx';
const Section = styled.section`
display: flex;
  padding: 80px 0;
  background-color: #f9f9f9;
    user-select: none;
  outline: none;
`;

const Title = styled.h1`
  font-size: 36px;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 18px;
`;

const IssueGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 30px;
  
`;

const IssueItem = styled.div`
  width: 23%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
`;

const ImgLeftWrapper = styled.div`
  position: relative;
    width: 30%;
    overflow: hidden;
    cursor: pointer;
    margin-left: 20px;
    height: 100%;
`;

const ImgLeft = styled.img`
   position: relative;
    width: 100%;
    height: 517px;
    margin-right: 20px;
    border-radius: 20px;
    transition: transform 0.5s ease;
    overflow: hidden;
    &:hover {
        transform: scale(1.1);
    } 
`;
const ContentImage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const ProductCategory = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
`;

const Container1 = styled.div`
  max-width: 962px;
  margin: 0 auto;
  padding: 0 15px;
`;

const All = styled.div`
  background-color: #999999;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
 
`;

const OtherIssues = () => {
  
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Section data-aos="fade-up" data-aos-delay="400">
      
      <ImgLeftWrapper>
        <ImgLeft src='img/home1.png' />
        <ContentImage>
          <ProductCategory style={{ color: 'white' }}>Heal all wounds</ProductCategory>
        </ContentImage>
      </ImgLeftWrapper>
      <Container1>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <Title >Dịch Vụ Nổi Bật Của Chúng Tôi</Title>
            <Subtitle>Khám phá những dịch vụ đặc biệt chúng tôi cung cấp để nâng cao trải nghiệm du lịch của bạn</Subtitle>
          </div>
          <All >
            <a href="/services" style={{ textDecoration: 'none', color: 'white', fontSize:'14px' }}>Xem Tất Cả <RightOutlined /></a>
          </All>
        </div>
        <IssueGrid>
          <ServiceList limit={3} />
        </IssueGrid>
      </Container1>
    </Section>
  );
};

export default OtherIssues;
