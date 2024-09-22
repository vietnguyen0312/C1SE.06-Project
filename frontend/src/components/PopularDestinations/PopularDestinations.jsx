import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Section = styled.section`
  padding: 120px 0;
  background-color: #f8f9fa;
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
  margin-right: -15px;
  margin-left: -15px;
`;

const Col = styled.div`
  flex: 0 0 ${(props) => props.size};
  max-width: ${(props) => props.size};
  padding: 0 15px;
`;

const TitleArea = styled.div`
  text-align: center;
  margin-bottom: 70px;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 36px;
`;

const Subtitle = styled.p`
  color: #777;
`;

const DestinationCard = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const ThumbWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  transition: all 0.3s ease;

  ${DestinationCard}:hover & {
    transform: scale(1.1);
  }
`;

const DescriptionArea = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  text-align: center;
  color: white;
`;

const PriceButton = styled.a`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  text-decoration: none;
  margin-bottom: 10px;
`;

const DestinationName = styled.h4`
  margin-bottom: 5px;
`;

const DestinationLocation = styled.p`
  margin: 0;
`;

const destinations = [
  { id: 1, name: "Mountain River", location: "Paraguay", price: "$150", image: "image/d1.jpg" },
  { id: 2, name: "Dream City", location: "Paris", price: "$250", image: "image/d2.jpg" },
  { id: 3, name: "Cloud Mountain", location: "Sri Lanka", price: "$350", image: "image/d3.jpg" },
  { id: 4, name: "Ocean Breeze", location: "Maldives", price: "$450", image: "image/d4.jpg" },
  { id: 5, name: "Forest Escape", location: "Canada", price: "$550", image: "image/d5.jpg" },
  { id: 6, name: "Desert Adventure", location: "Morocco", price: "$650", image: "image/d6.jpg" },
];

const ITEMS_PER_PAGE = 3;

const PopularDestinations = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentDestinations = destinations.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(destinations.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);

  return (
    <Section className="popular-destination-area section-gap" data-aos="fade-right">
      <Container>
        <Row>
          <Col size="100%">
            <TitleArea>
              <Title>Popular Destinations</Title>
              <Subtitle>We all live in an age that belongs to the young at heart. Life that is becoming extremely fast, day.</Subtitle>
            </TitleArea>
          </Col>
        </Row>
        <Row>
          {currentDestinations.map((destination) => (
            <Col key={destination.id} size="33.333%">
              <DestinationCard className="single-destination relative">
                <ThumbWrapper className="thumb relative">
                  <Overlay className="overlay overlay-bg" />
                  <Image className="img-fluid" src={destination.image} alt={destination.name} />
                </ThumbWrapper>
                <DescriptionArea className="desc">
                  <PriceButton href="#" className="price-btn">{destination.price}</PriceButton>
                  <DestinationName>{destination.name}</DestinationName>
                  <DestinationLocation>{destination.location}</DestinationLocation>
                </DescriptionArea>
              </DestinationCard>
            </Col>
          ))}
        </Row>
        <Row>
          <Col size="100%">
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    margin: '0 5px',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: '1px solid #007bff',
                    backgroundColor: currentPage === index + 1 ? '#007bff' : '#fff',
                    color: currentPage === index + 1 ? '#fff' : '#007bff',
                    cursor: 'pointer',
                  }}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Section>
  );
};

export default PopularDestinations;
