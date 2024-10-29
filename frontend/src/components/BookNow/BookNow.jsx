import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ButtonCPN from '../Button/Button';
import { CheckOutlined, PhoneOutlined } from '@ant-design/icons';

const Section = styled.section`
  padding: 100px 0 170px 0;
  user-select: none;
  outline: none;
  position: relative;
  overflow: hidden;
  background-color: white;
`;

const HalfBackground = styled.div`
  position: absolute;
  background-image: url('/img/home/book.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  top: 0; 
  right: -150px;
  width: 50%; 
  height: 40%; 
  z-index: 0; 
  animation: leftToRight 4s ease-in-out infinite;
  @keyframes leftToRight {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-20px); }
  } 
`;



const Container = styled.div`
  display: flex;
  margin: 0 70px;
  gap: 70px;
  position: relative;
  z-index: 1;
`;
const Title = styled.h1`
  margin-bottom: 10px;
`;
const ContainerLeft = styled.div`
  position: relative;
  width: 50%;
`;
const ContainerRight = styled.div`
  width: 50%;
`;
const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const CheckIcon = styled(CheckOutlined)`
  background-color: #f8b600;
  color: white;
  border-radius: 50%;
  font-size: 15px;
  padding: 5px;
  margin-right: 10px;
`;

const Text = styled.h6`
  margin: 18px 0;
  font-size: 16px;
  line-height: 24px;
  color: #666;
  font-weight: 400;
`
const Content = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: 44%;
  left: 33%;
  transform: translate(-50%, -50%);
  z-index: 100;
  a {
    color: black;
    font-weight: 600;
    text-decoration: none;
    font-size: 14px;
    font-family: 'PTSerif';
    :hover{
      color: red;
    }
  }
`
const Icon = styled(PhoneOutlined)`
  font-size: 30px;
  margin-right: 10px;
  color: #f8b600;
`
const BookNow = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <Section>
      <HalfBackground />
      <Container>
        <ContainerLeft>
          <Image src="/img/home/gioiThieu.png" />
          <Content>
            <Icon />
            <a href='tel:0905040943'>BOOK NOW: <br/>0905040943</a>
          </Content>
        </ContainerLeft>
        <ContainerRight className='PTSerif'>
          <p className='Allison' style={{ fontSize: '50px', color: '#f8b600' }}>Đặt Chỗ Ngay</p>
          <h4 >Bắt đầu ngay kế hoạch cho chuyến đi đáng nhớ của bạn</h4>
          <Text>Khám phá trọn vẹn từng khoảnh khắc tuyệt vời cùng chúng tôi – nơi bạn sẽ trải nghiệm dịch vụ đẳng cấp, tận hưởng sự thư thái, niềm vui bất tận, và sự an yên trong suốt hành trình của mình.</Text>
          <p><CheckIcon />Không gian nghỉ ngơi sang trọng, đầy đủ tiện nghi</p>
          <p><CheckIcon />Cam kết an toàn và sức khỏe tuyệt đối</p>
          <p><CheckIcon />Đa dạng các loại dịch vụ vui chơi giải trí</p>
          <p><CheckIcon />Chất lượng dịch vụ đạt chuẩn cao, được khách hàng đánh giá tích cực</p>
          <ButtonCPN text='Đặt vé ngay' />
        </ContainerRight>
      </Container>
    </Section>
  );
};

export default BookNow;
