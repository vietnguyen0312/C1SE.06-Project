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

const AboutInfoSection = styled.section`
  padding: 120px 0;
`;

const InfoContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoLeft = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const InfoImage = styled.img`
  width: 100%;
  height: auto;
`;

const InfoRight = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 991px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const InfoSubtitle = styled.h6`
  color: #777;
  margin-bottom: 10px;
`;

const InfoTitle = styled.h1`
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  color: #777;
  line-height: 1.8;
`;

const About = () => {

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
                <Title>About Us</Title>
                <LinkNav>
                    <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                    <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                    <StyledLink to="/about" data-aos="fade-left" data-aos-delay="0">About Us</StyledLink>
                </LinkNav>
            </AboutContent>
            </Row>
        </Container>
        </BannerSection2>

        <AboutInfoSection>
        <InfoContainer>
        <InfoRow>
            <InfoLeft>
            <InfoImage src="/img/about/info-img.jpg" alt="About Us" />
            </InfoLeft>
            <InfoRight>
            <InfoSubtitle>About Us</InfoSubtitle>
            <InfoText>
                Here, I focus on a range of items and features that we use in life without giving them a second thought. such as Coca Cola. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </InfoText>
            </InfoRight>
        </InfoRow>
        </InfoContainer>
        </AboutInfoSection>
    </>
  );
};

export default About;