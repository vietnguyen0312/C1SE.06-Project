import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BannerSection2 } from '../Home/style';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  margin-top:79px;
  
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
  padding: 120px;
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:10px;
`;

const HeaderContent = styled.div`
  font-size: 80px;
  color: #f8b600;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HeaderContent2 = styled.div`
  font-size: 16px;
  color: #777;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:30px;
`

const BodyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  height: 300px;
`
const BodyImg = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`
const Body1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding-bottom: 100px;
  border-bottom: 1px solid #777;
  
`
const Body1Content = styled.div`
  width: 50%;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const TeamMember = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`
const TeamImg = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px 10px 0 0;
`
const ImageContainer = styled.img`
  width: 50%;
  height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 10px;
`

const About = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <>
      <BannerSection2>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title>Giới thiệu</Title>
              <LinkNav>
                <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Trang chủ</StyledLink>
                <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                <StyledLink to="/about" data-aos="fade-left" data-aos-delay="0">Giới thiệu</StyledLink>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection2>

      <AboutInfoSection>
        <Header>
          <HeaderContent className='Allison'>Tại sao chọn chúng tôi</HeaderContent>
          <HeaderContent2>Chúng tôi cung cấp các dịch vụ đa dạng, chất lượng cao, đáp ứng mọi nhu cầu của khách hàng.</HeaderContent2>
        </Header>
        <Body>
          <BodyContainer>
            <BodyImg src="/img/about/price.png" />
            <div>Đảm bảo giá tốt nhất</div>
            <div style={{ textAlign: 'center', color: '#777' }}>Chúng tôi cam kết giá cả cạnh tranh, mang lại giá trị tốt nhất cho khách hàng.</div>
          </BodyContainer>
          <BodyContainer>
            <BodyImg src="/img/about/nhanh.png" />
            <div>Dễ dàng và nhanh chóng</div>
            <div style={{ textAlign: 'center', color: '#777' }}>Quy trình đặt hàng và sử dụng dịch vụ được đơn giản hóa để tiết kiệm thời gian cho bạn.</div>
          </BodyContainer>
          <BodyContainer>
            <BodyImg src="/img/about/da.png" />
            <div>Đa dạng các loại dịch vụ</div>
            <div style={{ textAlign: 'center', color: '#777' }}>Từ du lịch, khách sạn đến các dịch vụ giải trí, chúng tôi đều có.</div>
          </BodyContainer>
          <BodyContainer>
            <BodyImg src="/img/about/chamSoc.png" />
            <div>Hỗ trợ khách hàng 24/7</div>
            <div style={{ textAlign: 'center', color: '#777' }}>Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ bạn bất cứ lúc nào.</div>
          </BodyContainer>
        </Body>
        <Body1>
          <Body1Content>
            <div className='Allison' style={{ fontSize: '60px', color: '#f8b600', marginBottom: '20px' }}>Về Du Lịch Sinh Thái</div>
            <div style={{ fontSize: '17px', color: '#777', marginBottom: '20px' }}>Khám phá vẻ đẹp thiên nhiên và bảo vệ môi trường cùng chúng tôi.</div>
            <div style={{ fontSize: '17px', color: '#777' }}>Hãy trải nghiệm những chuyến đi đầy cảm hứng với các hoạt động thân thiện với môi trường, từ việc khám phá các khu rừng nguyên sinh đến việc tham gia vào các dự án bảo tồn địa phương.</div>
          </Body1Content>
          <ImageContainer src="/img/about/a1.jpg" ></ImageContainer>
        </Body1>
        <div>
          <div className='Allison' style={{ fontSize: '60px', color: '#f8b600', marginBottom: '30px', textAlign: 'center' }}>Đội Ngũ Của Chúng Tôi</div>
          <TeamMember>
            <div>
              <TeamImg src="/img/about/viet.jpg"></TeamImg>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>Nguyễn Hoàng Việt</div>
              <div style={{ textAlign: 'center', color: '#777' }}>Scrum Master</div>
            </div>
            <div>
              <TeamImg src="/img/about/nhan.jpg"></TeamImg>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>Doãn Thiên Nhân</div>
              <div style={{ textAlign: 'center', color: '#777' }}>Product Owner</div>
            </div>
            <div>
              <TeamImg src="/img/about/binh.jpg"></TeamImg>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>Bùi Văn Bình</div>
              <div style={{ textAlign: 'center', color: '#777' }}>Developer</div>
            </div>
            <div>
              <TeamImg src="/img/about/quyen.jpg"></TeamImg>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>Hoàng Nghĩa Quyền</div>
              <div style={{ textAlign: 'center', color: '#777' }}>Developer</div>
            </div>
          </TeamMember>

        </div>
      </AboutInfoSection>
    </>
  );
};

export default About;

