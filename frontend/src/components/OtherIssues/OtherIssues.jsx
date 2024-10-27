import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RightOutlined } from '@ant-design/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceList from '../../Service/ServiceList.jsx';
import ButtonCPN from '../Button/Button.jsx';
const Section = styled.section`
display: flex;
  padding: 20px 0;
  background-color: #f9f9f9;
    user-select: none;
  outline: none;
`;

const Title = styled.h1`
  font-size: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f8b600;
  margin-top: 30px;
`;


const IssueGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 30px;
  
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


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
`
const Title1 = styled.p`
  font-size: 20px;
`
const OtherIssues = () => {
  
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Container>
      <div>
        <Title className='Allison'>Services Hot</Title>
      </div>
      <Section>
        <ImgLeftWrapper>
        <ImgLeft src='img/home1.png' />
        <ContentImage>
          <ProductCategory style={{ color: 'white' }}>Heal all wounds</ProductCategory>
        </ContentImage>
      </ImgLeftWrapper>
      <Container1>
        <Header>
          <div>
            <Title1 className='LibreBaskerville'>Một số dịch vụ nổi bật ở chúng tôi</Title1>
          </div>
          <ButtonCPN text='Xem tất cả' style={{fontSize:'14px',width:'150px'}} />
        </Header>
        <IssueGrid data-aos="fade-left" data-aos-delay="400">
          <ServiceList limit={3} />
        </IssueGrid>
      </Container1>
      </Section>
    </Container>
  );
};

export default OtherIssues;
