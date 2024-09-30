import UserProfile from '../../../components/UserProfile';
import styled from 'styled-components';
import { BannerSection3 } from './Style';


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
  margin-top: 79px;
`;

const Title = styled.h1`
  color: white;
  font-size: 48px;
  margin-bottom: 20px;
`;

const UserProfileLayout = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', userSelect: 'none', outline: 'none' }}>
      <BannerSection3>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title data-aos="fade-left">Thông tin cá nhân</Title>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection3>
      <UserProfile />
    </div>
  );
};

export default UserProfileLayout;
