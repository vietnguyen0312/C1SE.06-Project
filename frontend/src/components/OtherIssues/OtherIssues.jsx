import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '../../Layout/PublicLayout/Header/style.js'; 
import AOS from 'aos';
import 'aos/dist/aos.css';
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

const IssueImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
`;

const IssueTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
`;

const IssueDescription = styled.p`
  font-size: 14px;
  color: #777;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #007bff;
  background-color: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#007bff')};
  cursor: pointer;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const OtherIssues = () => {
  const issues = [
    {
      image: '/image/o1.jpg',
      title: 'Rent a Car',
      description: 'The preservation of human life is the ultimate value, a pillar of ethics and the foundation.'
    },
    {
      image: '/image/o2.jpg',
      title: 'Cruise Booking',
      description: 'I was always somebody who felt quite sorry for myself, what I had not got compared.'
    },
    {
      image: '/image/o3.jpg',
      title: 'To Do List',
      description: 'The following article covers a topic that has recently moved to center stage–at least it seems.'
    },
    {
      image: '/image/o4.jpg',
      title: 'Food Features',
      description: 'There are many kinds of narratives and organizing principles. Science is driven by evidence.'
    },
    {
      image: '/image/o5.jpg',
      title: 'Hotel Booking',
      description: 'Discover the best hotel deals in your favorite city with a wide variety of options.'
    },
    {
      image: '/image/o6.jpg',
      title: 'Flight Booking',
      description: 'Book the cheapest flights to your favorite destinations with ease and convenience.'
    },
    {
      image: '/image/o7.jpg',
      title: 'Tour Packages',
      description: 'Explore exclusive tour packages and enjoy the ultimate travel experience with guided tours.'
    },
    {
      image: '/image/o8.jpg',
      title: 'Event Planning',
      description: 'Let us help you plan your next event with ease and efficiency, ensuring every detail is perfect.'
    }
  ];

  const ITEMS_PER_PAGE = 4;
  const [currentPage, setCurrentPage] = useState(1);
  
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentIssues = issues.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(issues.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);

  return (
    <Section>
      <Container>
        <Title data-aos="zoom-in">Other issues we can help you with</Title>
        <Subtitle data-aos="zoom-in">We all live in an age that belongs to the young at heart. Life that is.</Subtitle>
        
        <IssueGrid>
          {currentIssues.map((issue, index) => (
            <IssueItem key={index}>
              <IssueImage src={issue.image} alt={issue.title} />
              <IssueTitle>{issue.title}</IssueTitle>
              <IssueDescription>{issue.description}</IssueDescription>
            </IssueItem>
          ))}
        </IssueGrid>

        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </Pagination>
      </Container>
    </Section>
  );
};

export default OtherIssues;
