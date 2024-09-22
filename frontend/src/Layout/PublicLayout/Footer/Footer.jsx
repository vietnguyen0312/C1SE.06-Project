import React from 'react';
import styled from 'styled-components';
import { Container } from '../header/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faDribbble, faBehance } from '@fortawesome/free-brands-svg-icons';

const FooterArea = styled.footer`
  background-color: #04091e;
  padding: 80px 0;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const Column = styled.div`
  flex: 1;
  padding: 0 15px;
  margin-bottom: 30px;
`;

const Title = styled.h6`
  color: #fff;
  margin-bottom: 25px;
`;

const Text = styled.p`
  color: #777777;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Link = styled.a`
  color: #777777;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

const NewsletterForm = styled.form`
  position: relative;
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 10px;
  background: #fff;
  border: none;
`;

const NewsletterButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  border: none;
  background: #fab700;
  color: #fff;
  padding: 0 20px;
`;

const InstaFeed = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const InstaItem = styled.li`
  width: 25%;
  padding: 5px;
`;

const InstaImage = styled.img`
  width: 100%;
  height: auto;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #333;
  padding-top: 20px;
`;

const FooterText = styled.p`
  color: #777777;
`;

const FooterSocial = styled.div`
  a {
    color: #777777;
    margin-left: 15px;
    &:hover {
      color: #fab700;
    }
  }
`;

const Footer = () => {
  return (
    <FooterArea>
      <Container>
        <Row>
          <Column>
            <Title>About Agency</Title>
            <Text>
              The world has become so fast paced that people don't want to stand by reading a page of information, they would much rather look at a presentation and understand the message. It has come to a point
            </Text>
          </Column>
          <Column>
            <Title>Navigation Links</Title>
            <Row>
              <Column>
                <LinkList>
                  <li><Link href="#">Home</Link></li>
                  <li><Link href="#">Feature</Link></li>
                  <li><Link href="#">Services</Link></li>
                  <li><Link href="#">Portfolio</Link></li>
                </LinkList>
              </Column>
              <Column>
                <LinkList>
                  <li><Link href="#">Team</Link></li>
                  <li><Link href="#">Pricing</Link></li>
                  <li><Link href="#">Blog</Link></li>
                  <li><Link href="#">Contact</Link></li>
                </LinkList>
              </Column>
            </Row>
          </Column>
          <Column>
            <Title>Newsletter</Title>
            <Text>
              For business professionals caught between high OEM price and mediocre print and graphic output.
            </Text>
            <NewsletterForm>
              <NewsletterInput type="email" placeholder="Email Address" />
              <NewsletterButton type="submit">
                <FontAwesomeIcon icon={faTwitter} />
              </NewsletterButton>
            </NewsletterForm>
          </Column>
          <Column>
            <Title>InstaFeed</Title>
            <InstaFeed>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <InstaItem key={i}>
                  <InstaImage src={`/image/i${i}.jpg`} alt={`Instagram ${i}`} />
                </InstaItem>
              ))}
            </InstaFeed>
          </Column>
        </Row>
        <FooterBottom>
          <FooterText>
            Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with <span role="img" aria-label="love">❤️</span> by <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer">Colorlib</a>
          </FooterText>
          <FooterSocial>
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faDribbble} /></a>
            <a href="#"><FontAwesomeIcon icon={faBehance} /></a>
          </FooterSocial>
        </FooterBottom>
      </Container>
    </FooterArea>
  );
};

export default Footer;