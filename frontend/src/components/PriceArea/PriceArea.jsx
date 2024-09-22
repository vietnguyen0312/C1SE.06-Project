import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../../Layout/PublicLayout/Header/style.js';
import AOS from 'aos';
import 'aos/dist/aos.css';



const Section = styled.section`
background-image: url('/img/about/price-bg.png');
  padding: 80px 0;
    user-select: none;
  outline: none;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 70px;
`;

const PriceGrid = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PriceColumn = styled.div`
  width: 30%;
`;

const SinglePrice = styled.div`
  background: #f9f9ff;
  border-radius: 10px;
  padding: 40px;
`;

const PackageTitle = styled.h4`
  text-align: center;
  margin-bottom: 30px;
`;

const PriceList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PriceItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PriceButton = styled.a`
  color: Black;
  padding: 5px 10px;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    color: white;
    background-color: #f8b600;
  }
`;

const PriceArea = () => {
  const packages = [
    { title: 'Cheap Packages', items: ['New York', 'Maldives', 'Sri Lanka', 'Nepal', 'Thailand', 'Singapore'] },
    { title: 'Luxury Packages', items: ['New York', 'Maldives', 'Sri Lanka', 'Nepal', 'Thailand', 'Singapore'] },
    { title: 'Camping Packages', items: ['New York', 'Maldives', 'Sri Lanka', 'Nepal', 'Thailand', 'Singapore'] },
  ];

  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);

  return (
    <Section>
      <Container>
        <Title>We Provide Affordable Prices</Title>
        <Subtitle>Well educated, intellectual people, especially scientists at all times demonstrate considerably.</Subtitle>
        <PriceGrid data-aos="fade-left" >
          {packages.map((pkg, index) => (
            <PriceColumn key={index}>
              <SinglePrice>
                <PackageTitle>{pkg.title}</PackageTitle>
                <PriceList >
                  {pkg.items.map((item, itemIndex) => (
                    <PriceItem key={itemIndex}>
                      <span>{item}</span>
                      <PriceButton href="#">$1500</PriceButton>
                    </PriceItem>
                  ))}
                </PriceList>
              </SinglePrice>
            </PriceColumn>
          ))}
        </PriceGrid>
      </Container>
    </Section>
  );
};

export default PriceArea;