import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Section = styled.section`
  padding: 100px 0;
  background-color: #f8f9fa;
    user-select: none;
  outline: none;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom:30px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 25px;
`;

const Subtitle = styled.p`
  color: #f8b600;
  font-size: 60px;
  
`;

const ImageGame = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  height: 250px;
`

const ImageGame1 = styled.div`
  position: relative;
  background-color: #f8b600;
  width: 23%;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05); 
  }
`

const ImageGame2 = styled.div`
  position: relative;
  background-color: #f8b600;
  width: 54%;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease; 
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`

const ImageHotel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
  height: 250px;
`
const ImageHotel1 = styled.div`
  position: relative;
  background-color: #f8b600;
  width: 50%;
  border-radius: 10px;
  overflow: hidden; 
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05); 
  }
`

const Content = styled.span`
  position: absolute;
  color: white;
  font-size: 25px;
  font-weight: bold;
  bottom: 30px;
  display: flex;
  align-items: center;
  margin-left: 30px;
  width: 100%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.8);
 
`
const PopularDestinations = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Section className="popular-destination-area section-gap" data-aos="fade-up">
      <Container>
        <TitleArea>
          <Subtitle className='Allison'>Danh sách các dịch vụ</Subtitle>
          <Title className='LibreBaskerville'>Trải nghiệm ngay !!</Title>
        </TitleArea>
        <ImageGame>
          <ImageGame1>
            <Image src="/img/xichlo1.jpg" />
            <Content>Di Chuyển</Content>
          </ImageGame1>
          <ImageGame2>
            <Image src="/img/home/trochoi.jpg" />
            <Content>Trò Chơi</Content>
          </ImageGame2>
          <ImageGame1>
            <Image src="/img/home/phim.jpg" />
            <Content>Xem Phim</Content>
          </ImageGame1>
        </ImageGame>
        <ImageHotel>
          <ImageHotel1>
            <Image src="/img/home/khachsan.jpg" />
            <Content>Khách Sạn</Content>
          </ImageHotel1>
          <ImageHotel1>
            <Image src="/img/home/anuong.jpg" />
            <Content>Ăn uống</Content>
          </ImageHotel1>
        </ImageHotel>
      </Container>
    </Section>
  );
};

export default PopularDestinations;
