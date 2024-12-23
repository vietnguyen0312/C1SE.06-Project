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
  font-family: 'PTSerif';
  position: relative;
  background-image: url('/img/home/ratingg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: auto;
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

export const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 50px;
  color: #f8b600;
  font-family:'Allison';
`;

export const Subtitle = styled.p`
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
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  width: 350px;
  padding: 20px;
  border-radius: 8px;
  
`;

const ThumbImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const TestimonialContent = styled.div`
  flex: 1;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
`;

const TestimonialText = styled.p`
  margin: 20px;
  font-size: 16px;
  color: #555;
  line-height: 30px;
`;

const TestimonialAuthor = styled.h4`
  margin-bottom: 5px;
  font-size: 18px;
  color: #333;
`;

const StarRating = styled.div`
  color: #ffc107;
  margin-top: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const TestimonialType = styled.p`
  font-size: 16px;
  color: #f8b600;
`;

const testimonials = [
  {
    image: "img/user.png",
    text: "Do you want to be even more successful? Learn to love learning and growth.",
    author: "Harriet Maxwell",
    Type: 'Khách hàng', 
    rating: 4
  },
  {
    image: "img/user.png",
    text: "A purpose is the eternal condition for success. Every former smoker can tell you how hard it is.",
    author: "Carolyn Craig",
    Type: 'Khách hàng', 
    rating: 3
  },
  {
    image: "img/user.png",
    text: "The more effort you put into improving your skills, the bigger the payoff.",
    author: "Dennis Williams",
    Type: 'Khách hàng', 
    rating: 5
  },
  { 
    image: "img/user.png",
    text: "Success depends on your willingness to keep learning and growing.",
    author: "Sophia Turner",
    Type: 'Khách hàng', 
    rating: 5
  },
  {
    image: "img/user.png",
    text: "The more you grow, the more successful you become. Keep pushing your limits.",
    author: "James Smith",
    Type: 'Khách hàng', 
    rating: 4
  },
  {
    image: "img/user.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    Type: 'Khách hàng', 
    rating: 5
  },
  {
    image: "img/user.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    Type: 'Khách hàng', 
    rating: 5
  },
  {
    image: "img/user.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    Type: 'Khách hàng', 
    rating: 5
  },
  {
    image: "img/user.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    Type: 'Khách hàng', 
    rating: 1
  },
  {
    image: "img/user.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    Type: 'Khách hàng', 
    rating: 1
  },
  {
    image: "img/user.png",
    text: "Learn to love learning and growth. The more effort you put, the bigger the payoff.",
    author: "Natalie Brown",
    Type: 'Khách hàng', 
    rating: 1
  },

];

const TestimonialArea = () => {
  const ITEMS_PER_PAGE = 3; 
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, [totalPages]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <TestimonialSection data-aos="fade-up">
      <Container>
        <TitleArea>
          <Title>Testimonial & Review</Title>
          <Subtitle>Những cảm nhận của khách hàng</Subtitle>
        </TitleArea>
        <TestimonialGrid>
          {currentTestimonials.map((testimonial, index) => (
            <TestimonialItem key={index}>
              <ThumbImage src={testimonial.image} alt={testimonial.author} />
              <TestimonialContent>
                <StarRating data-aos="fade-left">
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
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>{testimonial.author}</TestimonialAuthor>
                <TestimonialType>{testimonial.Type}</TestimonialType>
              </TestimonialContent>
            </TestimonialItem>
          ))}
        </TestimonialGrid>

        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handlePageChange(index + 1)}
              style={{
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                margin: '0 5px',
                padding: '0',
                backgroundColor: currentPage === index + 1 ? "#f8b600" : "#ffffff",
                border: `2px solid ${currentPage === index + 1 ? "#f8b600" : "#cccccc"}`,
                color: currentPage === index + 1 ? "#ffffff" : "#333333",
                cursor: 'pointer'
              }}
            >
            </motion.button>
          ))}
        </Pagination>
      </Container>
    </TestimonialSection>
  );
};

export default TestimonialArea;