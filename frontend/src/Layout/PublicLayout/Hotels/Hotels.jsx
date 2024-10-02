import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SliderCpn from '../../../components/Slider/SliderCpn';
import ButtonCpn from '../../../components/Button/Button';
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
  margin-top: 150px;
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
  margin-top: 79px;
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
  background-color: #f5f5f5;
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

const BannerSectionHotels = styled.section`
  background-image: url('/img/hotels/headerHotel.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  user-select: none;
  outline: none;
`;

const TypeRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  user-select: none;
  outline: none;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  p {
    width: 50%;
  }
  h1 {
    font-weight: bold;
    font-size: 63px;
    font-family: 'Arial', sans-serif;
  }
`;

const RoomCard = styled.div`
  width: 47vh;
  height: 500px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  &:hover {
    box-shadow: 0 0 20px rgba(237, 184, 36, 0.2);
    transform: translateY(-10px) scale(1.05);
  }
`;

const RoomImage = styled.img`
  width: 45vh;
  height: 300px;
  object-fit: cover;
  border-radius: 7px;
  cursor: pointer;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const RoomInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const RoomName = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;
const RoomPrice = styled.p`
  font-size: 16px;
  color: #dd2727;
`;
const LinkR = styled(StyledLink)`
  text-decoration: none;
  color: inherit;
  margin-bottom: 10px;
  &:hover {
    color: #f8b600;
    transition: 0.3s ease;
  }
`;

const ContainerSlider = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  height: 100vh;
  padding: 0 15px;
  border:none;
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  position: relative;
`;

const ModalImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 7px;
  
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  margin-top: 20px;
`;

const ModalPrice = styled.p`
  color: #dd2727;
  font-size: 18px;
  margin-bottom: 20px;
`;


const TRoom = [
  { img: '/img/hotels/h1.jpg', name: 'Phòng 1', price: '1.000.000 VNĐ', description: 'Mô tả phòng 1' },
  { img: '/img/hotels/h1.jpg', name: 'Phòng 2', price: '2.000.000 VNĐ', description: 'Mô tả phòng 2' },
  { img: '/img/hotels/h1.jpg', name: 'Phòng 3', price: '3.000.000 VNĐ', description: 'Mô tả phòng 3' },
  { img: '/img/hotels/h1.jpg', name: 'Phòng 4', price: '4.000.000 VNĐ', description: 'Mô tả phòng 4' },
  { img: '/img/hotels/h1.jpg', name: 'Phòng 5', price: '5.000.000 VNĐ', description: 'Mô tả phòng 5' },
  { img: '/img/hotels/h1.jpg', name: 'Phòng 6', price: '6.000.000 VNĐ', description: 'Mô tả phòng 6' },
];

const Hotels = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const handleRoomSelect = (roomName, roomPrice, roomDescription) => {
    setSelectedRoom(roomName);
    setSelectedPrice(roomPrice);
    setSelectedDescription(roomDescription);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  return (
    <>
      <BannerSectionHotels>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title data-aos="zoom-in" data-aos-delay="100">Hotels</Title>
              <LinkNav>
                <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                <StyledLink to="/hotels" data-aos="fade-left" data-aos-delay="0">Hotels</StyledLink>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container>
      </BannerSectionHotels>

      <AboutInfoSection data-aos="fade-up" data-aos-delay="100">
        <InfoContainer>
          <InfoRow>
            <InfoLeft>
              <InfoImage src="/img/hotels/h2.jpg" alt="About Us" />
            </InfoLeft>
            <InfoRight>
              <h1>Chào mừng đến với <br />Healing Ecotourism</h1>
              <InfoText>
                Nép mình xa xa sau những dãy núi xanh mướt, tách biệt với nhịp sống hối hả của thành phố Đà Nẵng, khu du lịch sinh thái mang tên "Healing Ecotourism" hiện lên như một điểm đến đầy quyến rũ. Healing Hotel, bao quanh bởi cảnh sắc thiên nhiên hoang sơ và không gian yên tĩnh đến lạ thường, mang đến cho du khách sự thư thái tuyệt đối. Đây là nơi lý tưởng để những ai yêu thiên nhiên có thể thả hồn, đắm chìm trong vẻ đẹp nguyên sơ và tận hưởng những phút giây bình yên tuyệt vời.
              </InfoText>
            </InfoRight>
          </InfoRow>
        </InfoContainer>
      </AboutInfoSection>

      <TypeRoom>
        <Container>
          <Row>
            <Content>
              <h1>Phòng</h1>
              <InfoText>Healing Hotel là nơi kết nối giữa vẻ đẹp thiên nhiên và sự sang trọng hiện đại.</InfoText>
            </Content>
          </Row>
          <Row style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {TRoom.map((room, index) => (
              <RoomCard key={index} data-aos="fade-up">
                <RoomImage src={room.img} alt={room.name} />
                <RoomInfo>
                  <RoomName>{room.name}</RoomName>
                  <RoomPrice>{room.price} / DAY</RoomPrice>
                  <LinkR to={`/booking?room=${room.name}&price=${room.price}`} onClick={() => handleRoomSelect(room.name, room.price)}>Đặt Phòng</LinkR>
                  <LinkR to="#" onClick={() => handleModalOpen(room)}>Xem Chi Tiết</LinkR>
                </RoomInfo>
              </RoomCard>
            ))}
          </Row>
        </Container>
      </TypeRoom>
      {isModalOpen && (
        <ModalOverlay onClick={handleModalClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleModalClose}>×</CloseButton>
            <ModalImage src={selectedRoom.img} alt={selectedRoom.name} />
            <RoomInfo>
            <ModalTitle>{selectedRoom.name}</ModalTitle>
            <ModalPrice>Giá: {selectedRoom.price}</ModalPrice>
            <p>Mô Tả : {selectedRoom.description}</p>
            <ButtonCpn text="Đặt Phòng" />
            </RoomInfo>
          </ModalContent>
        </ModalOverlay>
      )}
      <TypeRoom>
        <Container>
          <Row>
            <Content>
              <h1>Ảnh</h1>
              <InfoText>Nép mình giữa núi rừng xanh mướt, Healing Ecotourism là nơi kết nối hoàn hảo giữa thiên nhiên hoang sơ và sự sang trọng tinh tế. Tại đây, bạn sẽ được hòa mình vào không gian yên bình tuyệt đối, nơi mỗi góc nhìn đều là một tác phẩm nghệ thuật đầy cảm hứng, mang đến cho bạn trải nghiệm nghỉ dưỡng độc đáo và đẳng cấp.</InfoText>
            </Content>
          </Row>
        </Container>
      </TypeRoom>
      <ContainerSlider>
        <SliderCpn arrImages={['/img/hotels/slider/slider-1.jpg','/img/hotels/slider/slider-2.jpg','/img/hotels/slider/slider-3.jpg','/img/hotels/slider/slider-4.jpg']} />
      </ContainerSlider>
    </>
  );
};

export default Hotels;