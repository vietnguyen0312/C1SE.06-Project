import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SliderCpn from '../components/Slider/SliderCpn';
import axios from "../Configuration/AxiosConfig";
import ButtonCpn from '../components/Button/Button';

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
  width: 100%;
  height: auto;
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

class RoomTypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      selectedRoom: null,
      isModalOpen: false,
    };
  }


  componentDidMount() {
    AOS.init({ duration: 2000 });
    this.fetchRooms();
  }

  // Tạo một phương thức fetchRooms để lấy dữ liệu phòng từ API
  fetchRooms = async () => {
    let response = await axios.get('/room_type');
    this.setState({ rooms: response.result });
  };

  handleModalOpen = (room) => {
    this.setState({
      selectedRoom: room,
      isModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { rooms, selectedRoom, isModalOpen } = this.state;
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
                  Healing Hotel, bao quanh bởi cảnh sắc thiên nhiên hoang sơ và không gian yên tĩnh đến lạ thường, mang đến cho du khách sự thư thái tuyệt đối.
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
              {rooms.length > 0 ? (
                rooms.map((room, index) => (
                  <RoomCard key={index} data-aos="fade-up">
                    <RoomImage src={`/img/hotels/room_type/${room.image}`} alt={room.name} />
                    <RoomInfo>
                      <RoomName>{room.name}</RoomName>
                      <RoomPrice>{room.price.toLocaleString('vi-VN')} VNĐ / DAY</RoomPrice>
                      <LinkR to={`/booking?roomTypeId=${room.id}`} onClick={() => this.handleModalOpen(room)}>Đặt Phòng</LinkR>
                      <LinkR to="#" onClick={() => this.handleModalOpen(room)}>Xem Chi Tiết</LinkR>
                    </RoomInfo>
                  </RoomCard>
                ))
              ) : (
                <p>Không có phòng nào để hiển thị.</p>
              )}
            </Row>
          </Container>
        </TypeRoom>

        {/* Modal hiển thị chi tiết phòng */}
        {isModalOpen && selectedRoom && (
          <ModalOverlay onClick={this.handleModalClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <CloseButton onClick={this.handleModalClose}>×</CloseButton>
              <ModalImage src={`/img/hotels/room_type/${selectedRoom.image}`} alt={selectedRoom.name} />
              <ModalTitle>{selectedRoom.name}</ModalTitle>
              <ModalPrice>Giá: {selectedRoom.price.toLocaleString('vi-VN')} VNĐ</ModalPrice>
              <p>Mô Tả: {selectedRoom.detail}</p>
              <ButtonCpn text="Đặt Phòng" />
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Slider Section */}
        <TypeRoom>
          <Container>
            <Row>
              <Content>
                <h1>Ảnh</h1>
                <InfoText>Healing Ecotourism là nơi kết nối hoàn hảo giữa thiên nhiên hoang sơ và sự sang trọng tinh tế.</InfoText>
              </Content>
            </Row>
          </Container>
        </TypeRoom>
        <ContainerSlider>
          <SliderCpn arrImages={['/img/hotels/slider/slider-1.jpg', '/img/hotels/slider/slider-2.jpg', '/img/hotels/slider/slider-3.jpg', '/img/hotels/slider/slider-4.jpg']} />
        </ContainerSlider>
      </>
    );
  }
}

export default RoomTypeList;