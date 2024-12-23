import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BannerSection2 } from '../Home/style';
import { AboutContent } from '../About/About';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHouse, faPhone } from '@fortawesome/free-solid-svg-icons';
import ButtonCPN from '../../../components/Button/Button';
export const Overlay = styled.div`
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
  justify-content: center;
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

const ContactPageArea = styled.section`
  padding: 80px 0;
  user-select:none;
  outline:none;
`;


const AddressWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 15px;
`;

const SingleContactAddress = styled.div`
  display: flex;
  margin-bottom: 18px;
  align-items:center;
`;

const Icon = styled.div`
  margin-right: 15px;
  font-size: 24px;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  `;

const ContactDetails = styled.div`
  align-items:center;
`;

const ContactForm = styled.form`
  text-align: right;
  flex: 0 0 66.666667%;
  max-width: 66.666667%;
  padding: 0 15px;
`;

const FormGroup = styled.div`
  width:100%;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  height:63px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  height:150px;
`;

const Buttonn = styled.div`
  display:flex;
  justify-content:center;
`;

const Contact = () => {
  useEffect(() => {
    AOS.init({duration: 2000});
  }, []);

  return (
    <>
      <BannerSection2>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title>Contact US</Title>
              <LinkNav>
                <StyledLink to="/home" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                <StyledLink to="/contact" data-aos="fade-left" data-aos-delay="0">Contact US</StyledLink>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection2>

      <ContactPageArea>
        <Container>
          <Row>
            <AddressWrap>
              <SingleContactAddress>
                <Icon>
                   <FontAwesomeIcon icon={faHouse} style={{ color: "#f8b600" }} />
                </Icon>
                <ContactDetails>
                  <h5>Hoà Xuân, Đà Nẵng</h5>
                  <p>02 Võ An Ninh</p>
                </ContactDetails>
              </SingleContactAddress>
              <SingleContactAddress>
                <Icon>  <FontAwesomeIcon icon={faPhone} style={{ color: "#f8b600" }} /></Icon>
                <ContactDetails>
                  <h5>0905040943</h5>
                </ContactDetails>
              </SingleContactAddress>
              <SingleContactAddress>
                <Icon>  <FontAwesomeIcon icon={faEnvelope} style={{ color: "#f8b600" }} /></Icon>
                <ContactDetails>
                  <h5>quyen@gmail.com</h5>
                  <p>Hãy gửi cho chúng tôi thắc mắc của bạn!</p>
                </ContactDetails>
              </SingleContactAddress>
            </AddressWrap>
            <ContactForm id="myForm" action="mail.php" method="post">
              <Row>
                <FormGroup style={{marginRight:'30px'}}>
                  <Input name="name" placeholder="Enter your name" required type="text" />
                  <Input name="email" placeholder="Enter email address" pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required type="email" />
                  <Input name="subject" placeholder="Enter subject" required type="text" />
                </FormGroup>
                <FormGroup>
                  <Textarea name="message" placeholder="Enter Message" required></Textarea>
                  <Buttonn>
                    <ButtonCPN type="submit" text="SEND MESSEGE" />
                  </Buttonn>
                </FormGroup>
              </Row>
            </ContactForm>
          </Row>
          
        </Container>
        

      </ContactPageArea>
    </>
  );
};

export default Contact;