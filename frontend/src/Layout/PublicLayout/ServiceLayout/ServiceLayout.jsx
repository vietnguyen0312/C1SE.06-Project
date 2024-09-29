import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BannerSection2 } from '../Home/style';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { SearchOutlined } from '@ant-design/icons';


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

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: auto;
`;

export const NavMenuItem = styled.li`
  position: relative;
  list-style: none;
  margin-right: 0;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;



  &:hover > ul {
    display: block;
  }
`;

export const NavMenuLink = styled.a`
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 10px 15px;
  display: block;

  &:hover {
    color: #f8b600;
  }
`;

const SearchInput = styled.input`
  border: none;
  margin-left: 10px;
  outline: none; 
  width: 300px;
  &:focus {
    outline: none; 
  }
`;

const SearchIcon = styled(SearchOutlined)`
  margin:0 5px;
  cursor: pointer;
  user-select: none;
  background-color: #f8b600;
  padding: 10px;
  color: white;
  border-radius: 10px;
  width: 45px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ServiceLayout = () => {

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <>
      <BannerSection2>
        <Overlay />
        <Container>
          <Row>
            <AboutContent>
              <Title>Services</Title>
              <LinkNav>
                <StyledLink to="/" data-aos="fade-left" data-aos-delay="400">Home</StyledLink>
                <Arrow data-aos="fade-left" data-aos-delay="200">→</Arrow>
                <StyledLink to="/services" data-aos="fade-left" data-aos-delay="0">Services</StyledLink>
              </LinkNav>
            </AboutContent>
          </Row>
        </Container>
      </BannerSection2>

      <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center',marginRight: '40vh',padding:'20px 0',  userSelect: 'none' }}>
        <Item>
          <NavMenuItem className="nav-item dropdown" onMouseEnter={() => setActiveDropdown('Tất cả danh mục')} onMouseLeave={() => setActiveDropdown(null)}>
            <NavMenuLink href="#" className="nav-link dropdown-toggle" id="blogDropdown" role="button" aria-expanded={activeDropdown === 'Tất cả danh mục'}>
              Tất cả danh mục
            </NavMenuLink>
            <ul className={`dropdown-menu ${activeDropdown === 'Tất cả danh mục' ? 'show' : ''}`} aria-labelledby="blogDropdown" style={{ listStyle: 'none', padding: 0 ,marginTop:'10px'}} >
              <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="/services?serviceTypeId=1">Danh mục 1</NavMenuLink></li>
              <li><NavMenuLink style={{ color: 'black' }} className="dropdown-item" href="/services?serviceTypeId=2">Danh mục 2</NavMenuLink></li>
            </ul>
          </NavMenuItem>
          <SearchInput type="text" placeholder="Tìm kiếm" />
          <SearchIcon />
        </Item>
      </div>
    </>
  );
};

export default ServiceLayout;
