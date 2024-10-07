 import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BannerSection2 } from '../Home/style';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  margin-top:79px;
  
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const LinkNav = styled.p`
  color: white;
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Arrow = styled.span`
  margin: 0 10px;
`;
const TicketContainer = styled.div`
    
`
const TicketLeft = styled.div`
    
`
const TicketRight = styled.div`
    
`
const Ticket = () => {

  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);
  return (
    <>
        <BannerSection2>
        <Overlay />
        <Container>
            <Row>
            <AboutContent>
                <Title>Ticket</Title>
                <LinkNav>
                    <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                    <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                    <StyledLink to="/about" data-aos="fade-left" data-aos-delay="0">Ticket</StyledLink>
                </LinkNav>
            </AboutContent>
            </Row>
        </Container>
        </BannerSection2>

        <TicketContainer>
            <TicketLeft>

            </TicketLeft>
            <TicketRight>

            </TicketRight>
        </TicketContainer>
    </>
  );
};

export default Ticket;
