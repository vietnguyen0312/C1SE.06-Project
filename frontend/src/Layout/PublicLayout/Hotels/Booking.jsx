import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonCPN from '../../../components/Button/Button';

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
  height: 30vh;
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
`;

const Title = styled.h1`
  color: white;
  font-size: 90px;
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

const BannerSectionHotels = styled.section`
  background-image: url('/img/hotels/headerHotel.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 70vh;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  user-select: none;
  outline: none;
`;

const DatePickerContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const ContainerDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  width: 50%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  user-select: none;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 10px;
  border: 2px solid #f8b600;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
  max-width: 250px;

  &:focus {
    border-color: #000;
    max-width: 250px;
  }
`;

const RoomSelection = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  height: 100vh;
  margin: auto;
`;

const DateInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const PriceSquare = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8b600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 50px;
  border-radius: 5px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #dd9c00;
  }
`;

const ChooseRoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Payment = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #f8b600;
  width: 70%;
  p {
    font-size: 18px;
    color: #333;
    margin: 0;
  }

  a {
    padding: 10px 20px;
    color: black;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        color: #f8b600; 
    }
  }
`;

const Bookings = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showRoomSelection, setShowRoomSelection] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handleBookingClick = () => {
    if (startDate && endDate) {
      setShowRoomSelection(true);
    } else {
      alert("Vui lòng chọn cả ngày bắt đầu và ngày kết thúc!");
    }
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomName = query.get('room');
  const roomPrice = parseFloat(query.get('price')) || 0;
  const roomNumbers = Array.from({ length: 5 }, (_, index) => index + 1);

  const handlePriceClick = (price) => {
    setTotalPrice(prevTotal => prevTotal + price);
  };

  const prices = Array(5).fill(roomPrice);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <>
      <BannerSectionHotels>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <LinkNav>
                <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Xin chào đến với khách sạn Healing</StyledLink>
                <Title data-aos="fade-right" data-aos-delay="100">Nơi tốt nhất để <br /> nghỉ dưỡng</Title>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container>
      </BannerSectionHotels>
      <ContainerDate>
        <Row>
          <DatePickerContainer>
            <StyledDatePicker
              selected={startDate}
              onChange={date => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Chọn ngày bắt đầu"
            />
            <StyledDatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Chọn ngày kết thúc"
            />
          </DatePickerContainer>
        </Row>
        <Row>
          <ButtonCPN text="Đặt phòng" onClick={handleBookingClick} />
        </Row>
      </ContainerDate>
      {showRoomSelection && (
        <RoomSelection>
          <h2>Thông tin phòng đã chọn: {roomName}</h2>
          {startDate && endDate && (
            <DateInfo>
              <p>Ngày bắt đầu: {startDate.toLocaleDateString()}</p>
              <p>Ngày kết thúc: {endDate.toLocaleDateString()}</p>
            </DateInfo>
          )}
          <p>Giá phòng: {formatCurrency(roomPrice)}</p>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              borderBottom: '1px solid #f8b600'
            }}
          >
            {prices.map((price, index) => (
              <ChooseRoom
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <PriceSquare onClick={() => handlePriceClick(price)} />
                <span>{roomNumbers[index]}</span>
              </ChooseRoom>
            ))}
          </div>
          <Payment>
            <p>Tổng giá trị:</p>
            <p>{formatCurrency(totalPrice + roomPrice)}</p>
            <Link to="/">Đặt phòng</Link>
          </Payment>
        </RoomSelection>
      )}
    </>
  );
};

export default Bookings;