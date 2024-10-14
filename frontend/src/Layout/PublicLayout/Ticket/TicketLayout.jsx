import React from 'react';
import styled from 'styled-components';
import 'aos/dist/aos.css';
import Ticket from '../../../components/Ticket';


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

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const BannerSection2 = styled.section`
background-image: url('/img/ticket/n2.jpg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 55vh;
display: flex;
align-items: center;
position: relative;
z-index: 1;
user-select: none;
outline: none;
`;

export const AboutContent = styled.div`
  text-align: center;
  position: relative;
  z-index: 1;
  margin-top: 79px;
`;
const TicketLayout = () => {
  
  return (
    <>
      <BannerSection2>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title style={{ fontSize: '25px', fontWeight: 'none' }}>Tận Hưởng Những Trải Nghiệm Tuyệt Vời, Đặt Vé Ngay!</Title>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection2>
      <Ticket />
    </>
  );
};

export default TicketLayout;
