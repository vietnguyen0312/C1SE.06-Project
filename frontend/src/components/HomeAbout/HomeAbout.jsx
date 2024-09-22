import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 80px 0;
    user-select: none;
  outline: none;
`;

const Container = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

const LeftColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const RightColumn = styled.div`
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;

  @media (max-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Description = styled.p`
  margin-bottom: 30px;
`;

const CustomButton = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const HomeAbout = () => {
  return (
    <Section>
      <Container>
        <Row>
          <LeftColumn>
            <Title>
              Did not find your Package? <br />
              Feel free to ask us. <br />
              We'll make it for you
            </Title>
            <Description>
              Inappropriate behavior is often laughed off as "boys will be boys," women face higher conduct standards especially in the workplace. That's why it's crucial that, as women, our behavior on the job is beyond reproach. Inappropriate behavior is often laughed.
            </Description>
            <CustomButton href="#">Request custom price</CustomButton>
          </LeftColumn>
          <RightColumn>
            <Image src="/image/about-img.jpg" alt="About Us" />
          </RightColumn>
        </Row>
      </Container>
    </Section>
  );
};

export default HomeAbout;