import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../Layout/PublicLayout/Header/style.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ServiceList from '../../Service/ServiceList.jsx';
const Section = styled.section`
  padding: 80px 0;
  background-color: #f9f9f9;
    user-select: none;
  outline: none;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
  font-size: 36px;
`;

const Subtitle = styled.p`
  text-align: center;
  margin-bottom: 70px;
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

const OtherIssues = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Section>
      <Container>
        <Title data-aos="zoom-in">Dịch Vụ Nổi Bật Của Chúng Tôi</Title>
        <Subtitle data-aos="zoom-in">Khám phá những dịch vụ đặc biệt chúng tôi cung cấp để nâng cao trải nghiệm du lịch của bạn</Subtitle>
        <IssueGrid data-aos="zoom-in">
          <ServiceList limit={3} />
        </IssueGrid>
        <a href="/services" style={{ textDecoration: 'none', color: 'green' }}>Xem Tất Cả &gt;&gt;</a>
      </Container>
    </Section>
  );
};

export default OtherIssues;
