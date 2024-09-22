import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const TestimonialSection = styled.section`
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
  font-size: 18px;
`;

const TestimonialGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TestimonialItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    width: 48%;
    margin: 1%;
  }
`;

const ThumbImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 20px;
`;

const TestimonialContent = styled.div`
  flex: 1;
`;

const TestimonialText = styled.p`
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
`;

const TestimonialAuthor = styled.h4`
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
`;

const StarRating = styled.div`
  color: #ffc107;
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

const testimonials = [
  {
    image: "img/elements/user1.png",
    text: "Do you want to be even more successful? Learn to love learning and growth.",
    author: "Harriet Maxwell",
    rating: 4
  },
  {
    image: "img/elements/user2.png",
    text: "A purpose is the eternal condition for success. Every former smoker can tell you how hard it is.",
    author: "Carolyn Craig",
    rating: 3
  },
  {
    image: "img/elements/user3.png",
    text: "The more effort you put into improving your skills, the bigger the payoff.",
    author: "Dennis Williams",
    rating: 5
  },
  {
    image: "img/elements/user4.png",
    text: "Success depends on your willingness to keep learning and growing.",
    author: "Sophia Turner",
    rating: 5
  },
  {
    image: "img/elements/user5.png",
    text: "The more you grow, the more successful you become. Keep pushing your limits.",
    author: "James Smith",
    rating: 4
  },
  {
    image: "img/elements/user6.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    rating: 5
  },
];

const TestimonialArea = () => {
  // Phân trang
  const ITEMS_PER_PAGE = 2; // số lượng đánh giá trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(()=>{
    AOS.init({duration:2000});
  },[]);
  return (
    <TestimonialSection>
      <Container>
        <TitleArea>
          <Title>Testimonial from our Clients</Title>
          <Subtitle>See what our clients are saying about our services.</Subtitle>
        </TitleArea>

        <TestimonialGrid>
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialItem key={index}>
              <div>
                <ThumbImage src={testimonial.image} alt={testimonial.author} />
              </div>
              <TestimonialContent>
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                <StarRating  data-aos="fade-left" >
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      color={i < testimonial.rating ? "#ffc107" : "#e4e5e9"}
                      data-aos="fade-left"
                      data-aos-delay={`${i * 200}`} 
                    />
                  ))}
                </StarRating>

              </TestimonialContent>
            </TestimonialItem>
          ))}
        </TestimonialGrid>

        <Pagination data-aos="fade-left">
          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}  // Hiệu ứng khi nhấn
              whileHover={{ scale: 1.05 }} // Hiệu ứng khi hover
              onClick={() => handlePageChange(index + 1)}
              style={{
                margin: '0 5px',
                padding: '10px 20px',
                backgroundColor: currentPage === index + 1 ? "#007bff" : "#ffffff",
                border: `2px solid ${currentPage === index + 1 ? "#007bff" : "#cccccc"}`,
                color: currentPage === index + 1 ? "#ffffff" : "#333333",
                cursor: 'pointer'
              }}
            >
              {index + 1}
            </motion.button>
          ))}
        </Pagination>
      </Container>
    </TestimonialSection>
  );
};

export default TestimonialArea;
